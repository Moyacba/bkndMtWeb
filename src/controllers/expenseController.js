import { PrismaClient } from "db";
const prisma = new PrismaClient();

// Obtener todos los gastos
export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

// Obtener un gasto por ID
export const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findUnique({
      where: { id },
    });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Error fetching expense" });
  }
};

// Crear un nuevo gasto
export const createExpense = async (req, res) => {
  const { product, details, amount, method, date, category, categoryId } =
    req.body;

  try {
    const newExpense = await prisma.expense.create({
      data: {
        product,
        details,
        amount,
        method,
        date,
        category,
        categoryId,
      },
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Error creating expense" });
  }
};

// Actualizar un gasto
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { product, details, amount, method, date, category, categoryId } =
    req.body;

  try {
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        product,
        details,
        amount,
        method,
        date,
        category,
        categoryId,
      },
    });
    res.status(200).json(updatedExpense);
  } catch (error) {
    if (error.code === "P2025") {
      // Expense not found
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(500).json({ error: "Error updating expense" });
  }
};

// Eliminar un gasto
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.expense.delete({
      where: { id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    if (error.code === "P2025") {
      // Expense not found
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(500).json({ error: "Error deleting expense" });
  }
};
