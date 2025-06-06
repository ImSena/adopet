import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/datasource.config";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(()=> {
  console.log("Banco de dados conectado");
}).catch((error) => {
  console.error(error);
})

export default app;
