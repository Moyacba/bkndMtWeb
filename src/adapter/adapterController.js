import { PrismaClient as PrismaClientOld } from "dbOld";

const prisma = new PrismaClientOld();

// // Obtener todos los servicios
export const getOldServices = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;

    const services = await prisma.servicios.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        fechaIn: "desc",
      },
    });

    res.status(200).json(services);
  } catch (err) { 
    res.status(500).json({ error: "Error fetching services ", err });
  }
};

export const getOldProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;

    const products = await prisma.productos.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        codigo: "desc",
      },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products ", err });
  }
};