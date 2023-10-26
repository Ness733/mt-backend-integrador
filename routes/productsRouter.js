import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const productsRouter = express.Router();

import {
	getAllProducts,
	getOneProduct,
	saveProduct,
	editProduct,
	deleteProduct,
} from "../controllers/productsController.js";

productsRouter.get("/productos", getAllProducts);
productsRouter.get("/productos/:id", getOneProduct);
productsRouter.post("/productos", autenticacionDeToken, saveProduct);
productsRouter.patch("/productos/:id", autenticacionDeToken, editProduct);
productsRouter.delete("/productos/:id", autenticacionDeToken, deleteProduct);

export default productsRouter;
