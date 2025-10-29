import type { TransactionType } from "./transactions";

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
}
export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  percentage: number;
  [key: string]: string | number;
}
