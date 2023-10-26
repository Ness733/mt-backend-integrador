import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const cartRouter = express.Router();

import {
	getAllCarts,
	getOneCart,
	saveCart,
	deleteCart,
} from "../controllers/cartController.js";

cartRouter.get("/carro", getAllCarts);
cartRouter.get("/carro/:id", getOneCart);
cartRouter.post("/carro", autenticacionDeToken, saveCart);
cartRouter.delete("/carro/:id", autenticacionDeToken, deleteCart);

export default cartRouter;
