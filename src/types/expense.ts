export interface Expense {
    _id: string;
    date: string;
    amount: number;
    description?: string;
    category: ExpenseCategory;
  }
export enum ExpenseCategory {
  BILLS = "Bills",
  FOOD = "Food",
  PERSONALCARE = "Personal Care",
  PURCHASES = "Purchases",
  TRANSPORTATION = "Transportation",
  HOUSING = "Housing",
  UTILITIES = "Utilities",
  ENTERTAINMENT = "Entertainment",
  GROCERIES = "Groceries",
  HEALTH = "Health",
  INVESTMENTS = "Investments",
  KIDS = "Kids",
  PETS = "Pets",
  SHOPPING = "Shopping",
  SUBSCRIPTIONS = "Subscriptions",
  TAXES = "Taxes",
  TRAVEL = "Travel",
  OTHER = "Other",
}
