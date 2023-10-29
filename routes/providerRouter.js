import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const providerRouter = express.Router();

import {
	getAllProviders,
	getOneProvider,
	saveProvider,
	editProvider,
	deleteProvider,
} from "../controllers/providerController.js";

providerRouter.get("/proveedores", getAllProviders);
providerRouter.get("/proveedores/:id", getOneProvider);
providerRouter.post("/proveedores", autenticacionDeToken, saveProvider);
providerRouter.patch("/proveedores/:id", autenticacionDeToken, editProvider);
providerRouter.delete("/proveedores/:id", autenticacionDeToken, deleteProvider);

export default providerRouter;
