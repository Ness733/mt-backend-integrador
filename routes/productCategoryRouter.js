import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const categoriesRouter = express.Router();

import {
	getAllProductCategories,
	getOneProductCategories,
	saveProductCategory,
	editProductCategory,
	deleteProductCategory,
} from "../controllers/productCategoryController.js";

categoriesRouter.get("/categorias", getAllProductCategories);
categoriesRouter.get("/categorias/:id", getOneProductCategories);
categoriesRouter.post(
	"/categorias/",
	autenticacionDeToken,
	saveProductCategory
);
categoriesRouter.patch(
	"/categorias/:id",
	autenticacionDeToken,
	editProductCategory
);
categoriesRouter.delete(
	"/categorias/:id",
	autenticacionDeToken,
	deleteProductCategory
);

export default categoriesRouter;
