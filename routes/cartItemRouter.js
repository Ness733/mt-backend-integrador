import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const cartItemRouter = express.Router();

import {
	getAllCartItems,
	getOneCartItem,
	saveCartItem,
	editCartItem,
	deleteCartItem,
} from "../controllers/cartItemController.js";

cartItemRouter.get("/item", getAllCartItems);
cartItemRouter.get("/item/:id", getOneCartItem);
cartItemRouter.post("/item", autenticacionDeToken, saveCartItem);
cartItemRouter.patch("/item/:id", autenticacionDeToken, editCartItem);
cartItemRouter.delete("/item/:id", deleteCartItem);

export default cartItemRouter;
