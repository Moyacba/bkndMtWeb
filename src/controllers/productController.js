import { PrismaClient } from "db";
const prisma = new PrismaClient();

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;
    const keyword = req.query.keyword || "";
    let products;

    if (keyword === "") {
      products = await prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(products);
    }

    const arrayKeyword = keyword.split(" ");
    const arrayParKeyword = [];
    const searching = [];

    if (arrayKeyword.length > 1) {
      for (let i = 0; i < arrayKeyword.length - 1; i++) {
        arrayParKeyword.push(`${arrayKeyword[i]} ${arrayKeyword[i + 1]}`);
      }
    }

    for (const key of arrayKeyword) {
      searching.push({ name: { contains: key, mode: "insensitive" } });
    }

    products = await prisma.product.findMany({
      where: {
        OR: searching,
      },
    });

    const orderByRelevance = products
      .map((product) => {
        const productName = product.name.toLowerCase();
        let matchs = 0;

        for (const key of arrayKeyword) {
          if (productName.includes(key.toLowerCase())) {
            matchs++;
          }
        }

        for (const par of arrayParKeyword) {
          if (productName.includes(par.toLowerCase())) {
            matchs++;
          }
        }

        return { ...product, matchs };
      })
      .sort((a, b) => b.matchs - a.matchs);

    res.status(200).json(orderByRelevance.slice(0, pageSize));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const {
    createdAt,
    updatedAt,
    barcode,
    sku,
    name,
    description,
    category,
    brand,
    provider,
    costPrice,
    salePrice,
    promoPrice,
    percentPrice,
    stock,
    images,
    specifications,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        createdAt,
        updatedAt,
        barcode,
        sku,
        name,
        description,
        category,
        brand,
        provider,
        costPrice,
        salePrice,
        promoPrice,
        percentPrice,
        stock,
        images,
        specifications,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating product" });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    updatedAt,
    barcode,
    sku,
    name,
    description,
    category,
    brand,
    provider,
    costPrice,
    salePrice,
    promoPrice,
    percentPrice,
    stock,
    images,
    specifications,
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        updatedAt,
        barcode,
        sku,
        name,
        description,
        category,
        brand,
        provider,
        costPrice,
        salePrice,
        promoPrice,
        percentPrice,
        stock,
        images,
        specifications,
      },
    });
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      // Product not found
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "Error updating product" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    if (error.code === "P2025") {
      // Product not found
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: "Error deleting product" });
  }
};
