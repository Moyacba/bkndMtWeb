import { Router } from "express";
import authRoutes from "./auth/authRoutes.js";
import productRoutes from "./productRoutes.js";
import saleRoutes from "./saleRoutes.js";
import cashflowRoutes from "./cashflowRoutes.js";
import customerRoutes from "./customerRoutes.js";
import expenseRoutes from "./expenseRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import adapterRoutes from "../adapter/adapterRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/sale", saleRoutes);
router.use("/cashflow", cashflowRoutes);
router.use("/customer", customerRoutes);
router.use("/expense", expenseRoutes);
router.use("/service", serviceRoutes);
router.use("/adapter", adapterRoutes);

export default router;
