import type { Category, CategorySummary } from "./category";

export type TransactionType = "expense" | "income";
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string | Date;
  type: TransactionType;
  categoyId: string;
  category: Category;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}
export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expenseByCategory: CategorySummary[];
  incomeByCategory: CategorySummary[];
}

export interface MonthlyItem {
  name: string;
  expenses: number;
  income: number;
}
