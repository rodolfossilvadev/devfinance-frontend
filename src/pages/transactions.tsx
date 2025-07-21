import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import type { TransactionType } from "../types/transactions";
import { firebaseAuth } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import type { Category } from "../types/category";
import { Plus } from "lucide-react";

const Transactions = () => {
  const [type, setType] = useState<TransactionType>("expense");
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (!user) {
          throw new Error("Usuário não autenticado");
        }
        const token = await user.getIdToken();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
        toast.error("Erro ao buscar categorias");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !amount ||
      !date ||
      !selectedCategory ||
      Number(amount) <= 0 ||
      Number.isNaN(Number(amount))
    ) {
      toast.error("Preencha todos os campos corretamente!");
      return;
    }

    setLoading(true);

    try {
      const user = firebaseAuth.currentUser;
      if (!user) {
        throw new Error("Usuário não autenticado");
      }
      const token = await user.getIdToken();

      const isoDate = new Date(date + "T12:00:00").toISOString();

      console.log("Payload enviado para API:", {
        description: title,
        amount: Number(amount),
        date: isoDate,
        categoryId: selectedCategory,
        type,
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions`,
        {
          description: title,
          amount: Number(amount),
          date: isoDate,
          categoryId: selectedCategory,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Transação salva com sucesso!");
      setTitle("");
      setAmount("");
      setDate("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Erro ao salvar transação", error);
      toast.error("Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setAmount("");
    setDate("");
    setSelectedCategory("");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen">
        <Card
          icon={<Plus size={20} className="text-primary-700" />}
          title="Nova Transação"
          className="max-w-md w-full bg-blue-700 p-6 rounded-xl"
        >
          <div className="flex justify-between bg-blue-700 rounded-md p-1 mb-4">
            <button
              type="button"
              className={`w-1/2 py-2 rounded-md font-medium cursor-pointer ${
                type === "expense"
                  ? "bg-transparent text-red-500 border border-red-500"
                  : "text-white"
              }`}
              onClick={() => setType("expense")}
              disabled={loading}
            >
              Despesa
            </button>
            <button
              type="button"
              className={`w-1/2 py-2 rounded-md font-medium cursor-pointer ${
                type === "income" ? "bg-green-300 text-black" : "text-white"
              }`}
              onClick={() => setType("income")}
              disabled={loading}
            >
              Receita
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Ex: Supermercado, Salário, etc."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                className="w-full p-2 rounded-md bg-blue-700 text-white border border-gray-700 placeholder-gray-500"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="R$ 0,00"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                disabled={loading}
                className="w-full p-2 rounded-md bg-blue-700 text-white border border-gray-700 placeholder-gray-500"
              />
            </div>

            <div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
                className="w-full p-2 rounded-md bg-blue-700 text-white border border-gray-700"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading}
                className="w-full p-2 rounded-md bg-blue-700 text-white border border-gray-700"
              >
                <option value="">Selecione uma categoria</option>
                {categories
                  .filter((cat) => cat.type === type)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="px-4 py-2 rounded-md text-green-400 hover:text-green-500 border border-green-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400"
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
