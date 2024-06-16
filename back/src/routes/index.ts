import { Router } from "express";
import todoRoutes from "./todoRoutes";

const rootRoutes: Router = Router();

rootRoutes.use("/todos", todoRoutes);


export default rootRoutes;