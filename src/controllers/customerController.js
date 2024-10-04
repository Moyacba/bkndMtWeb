import { PrismaClient } from "db";
const prisma = new PrismaClient();

// Obtener todos los clientes
export const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching customers" });
  }
};

// Obtener un cliente por ID
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching customer" });
  }
};

// Crear un nuevo cliente
export const createCustomer = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    purchaseHistory,
    serviceHistory,
  } = req.body;

  // Encriptar la contraseña antes de guardar
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
        purchaseHistory,
        serviceHistory,
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    if (error.code === "P2002") {
      // Unique constraint violation (email)
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Error creating customer" });
  }
};

// Actualizar un cliente
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    purchaseHistory,
    serviceHistory,
  } = req.body;

  const updateData = {
    firstName,
    lastName,
    address,
    phone,
    purchaseHistory,
    serviceHistory,
  };

  // Si se proporciona una nueva contraseña, encriptarla
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
    });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    if (error.code === "P2025") {
      // Customer not found
      return res.status(404).json({ error: "Customer not found" });
    }
    if (error.code === "P2002") {
      // Unique constraint violation (email)
      return res.status(400).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Error updating customer" });
  }
};

// Eliminar un cliente
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.customer.delete({
      where: { id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    if (error.code === "P2025") {
      // Customer not found
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(500).json({ error: "Error deleting customer" });
  }
};
