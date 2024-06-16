import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRoutes from "./routes";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors())

app.use("/api", rootRoutes);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(PORT, () => console.log("server start"));
