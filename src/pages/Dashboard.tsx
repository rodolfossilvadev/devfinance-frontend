import { useEffect, useState } from "react";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionsMonthly, getTransactionSummary } from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import Card from "../components/Card";
import { ArrowDown, ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { FormatCurrency } from "../utils/formatters";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  type PieLabelRenderProps,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Rectangle,
} from "recharts";

const initialSummary: TransactionSummary = {
  totalExpenses: 0,
  totalIncomes: 0,
  balance: 0,
  expenseByCategory: [],
  incomeByCategory: [],
};

const Dashboard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

  useEffect(() => {
    async function loadTransactionSummary() {
      const response = await getTransactionSummary(month, year);
      setSummary(response);
    }
    loadTransactionSummary();
  }, [month, year]);
  useEffect(() => {
    async function loadTransactionsMonthly() {
      const response = await getTransactionsMonthly(month, year, 6);
      setMonthlyItemsData(response.history);
    }
    loadTransactionsMonthly();
  }, [month, year]);

  const renderPieChartLabel = ({ name, percent }: PieLabelRenderProps): string => {
    const percentage = percent ?? 0;
    return `${name}: ${(percentage * 100).toFixed(1)}%`;
  };

  const formatTooTipValue = (value: number | string): string => {
    return FormatCurrency(typeof value === "number" ? value : 0);
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-white">Dashboard</h1>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          icon={<Wallet size={20} className="text-green-500" />}
          title="Saldo"
          hover
          glowEffect={summary.balance > 0}
        >
          <p
            className={`text-2xl font-semibold mt-2 
            ${summary.balance > 0 ? "text-green-500" : "text-red-400"}
          `}
          >
            {FormatCurrency(summary.balance)}
          </p>
        </Card>
        <Card icon={<ArrowUp size={20} className="text-green-500" />} title="Receitas" hover>
          <p className="text-2xl font-semibold mt-2 text-green-500">
            {FormatCurrency(summary.totalIncomes)}
          </p>
        </Card>
        <Card icon={<ArrowDown size={20} className="text-red-600" />} title="Despesas" hover>
          <p className="text-2xl font-semibold mt-2 text-red-500">
            {FormatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
        <Card
          icon={<TrendingUp size={20} className="text-red-500" />}
          title="Despesas por categoria"
          className="min-h-80"
        >
          {summary.expenseByCategory.length > 0 ? (
            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={summary.expenseByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    nameKey="categoryName"
                    label={renderPieChartLabel}
                  >
                    {summary.expenseByCategory.map((entry) => (
                      <Cell key={`expense-${entry.categoryId}`} fill={entry.categoryColor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatTooTipValue} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Nenhuma despesa registrada nesse período
            </div>
          )}
        </Card>

        <Card
          icon={<TrendingUp size={20} className="text-green-500" />}
          title="Receitas por categoria"
          className="min-h-80"
        >
          {summary.incomeByCategory.length > 0 ? (
            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={summary.incomeByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    nameKey="categoryName"
                    label={renderPieChartLabel}
                  >
                    {summary.incomeByCategory.map((entry) => (
                      <Cell key={`income-${entry.categoryId}`} fill={entry.categoryColor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatTooTipValue} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Nenhuma receita registrada nesse período
            </div>
          )}
        </Card>

        <Card
          icon={<Calendar size={20} className="text-primary-700" />}
          title="Histórico mensal"
          className="hmin-h-80 p-2.5"
        >
          <div className="h-72 mt-4">
            {monthlyItemsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyItemsData} margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3B8"
                    tick={{ style: { textTransform: "capitalize" } }}
                  />
                  <YAxis
                    stroke="#94a3B8"
                    tickFormatter={FormatCurrency}
                    tick={{ style: { fontSize: 14 } }}
                  />
                  <Tooltip
                    formatter={FormatCurrency}
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      borderColor: "#2a2a2a",
                    }}
                    labelStyle={{ color: "#f8f8f8", textTransform: "capitalize" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="expenses"
                    name="Despesas"
                    fill="#ff6384"
                    activeBar={<Rectangle fill="#ff6384" stroke="green" />}
                  />
                  <Bar
                    dataKey="income"
                    name="Receitas"
                    fill="#37e359"
                    activeBar={<Rectangle fill="#37e359" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Nenhuma receita registrada nesse período
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
