import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { firebaseAuth } from "../config/firebase";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { Trash } from "lucide-react";
import dayjs from "dayjs";
import { FormatCurrency } from "../utils/formatters";
import Button from "../components/Button";
import MonthYearSelect from "../components/MonthYearSelect";

interface Category {
  name: string;
  color: string;
  type: "income" | "expense";
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
  type: "income" | "expense";
}

const TransactionsList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error("Usuário não autenticado");

      const token = await user.getIdToken();

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          month: String(month).padStart(2, "0"),
          year: String(year),
        },
      });

      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
      toast.error("Erro ao buscar transações");
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  const handleDelete = async (id: string) => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) throw new Error("Usuário não autenticado");

      const token = await user.getIdToken();

      await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Transação deletada!");
      fetchTransactions();
    } catch (error) {
      console.error("Erro ao deletar", error);
      toast.error("Erro ao deletar transação");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container-app py-8 bg-blue-950 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Transações</h2>
          <Button
            type="button"
            onClick={() => navigate("/transactions/new")}
            disabled={loading}
            className={`bg-primary-700 hover:bg-primary-600 text-black font-medium px-4 py-2 rounded-md transition cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            + Nova Transação
          </Button>
        </div>

        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />

        {loading ? (
          <div className="text-center text-gray-400 py-10">Carregando transações...</div>
        ) : (
          <div className="overflow-x-auto bg-blue-900 rounded-md mt-4">
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4">Descrição</th>
                  <th className="py-2 px-4">Data</th>
                  <th className="py-2 px-4">Categoria</th>
                  <th className="py-2 px-4">Valor</th>
                  <th className="py-2 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-gray-700">
                    <td className="py-2 px-4 font-medium text-white">{t.description}</td>
                    <td className="py-2 px-4">{dayjs(t.date).format("DD/MM/YYYY")}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: t.category.color }}
                      ></span>
                      {t.category.name}
                    </td>
                    <td
                      className={`py-2 px-4 font-semibold ${
                        t.type === "expense" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {FormatCurrency(t.amount)}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionsList;
