// src/app.ts
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { handleErrors } from "./utils/handleErrors.js";
import morgan from "morgan";
import serverless from "serverless-http";

const app = express();
app.use(
  cors({
    origin: "https://apirestmtweb.netlify.app",
    credentials: true,
  })
);
// Middlewares globales
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

app.use(morgan("dev"));

// Rutas
app.use("/api", router);
// app.use("/users", userRoutes);

// Middleware para manejar errores
app.use(handleErrors);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

// export default app;

const handler = serverless(app);

export default handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
