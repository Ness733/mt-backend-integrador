import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const salesRouter = express.Router();

import {
	getAllSales,
	getOneSale,
	saveSale,
	deleteSale,
} from "../controllers/salesController.js";

salesRouter.get("/ventas", getAllSales);
salesRouter.get("/ventas/:id", getOneSale);
salesRouter.post("/ventas", autenticacionDeToken, saveSale);
salesRouter.delete("/ventas/:id", autenticacionDeToken, deleteSale);

export default salesRouter;
