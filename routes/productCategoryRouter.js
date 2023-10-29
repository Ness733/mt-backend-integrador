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

categoriesRouter.get("/categories", getAllProductCategories);
categoriesRouter.get("/categories/:id", getOneProductCategories);
categoriesRouter.post(
	"/categories/",
	autenticacionDeToken,
	saveProductCategory
);
categoriesRouter.patch(
	"/categories/:id",
	autenticacionDeToken,
	editProductCategory
);
categoriesRouter.delete(
	"/categories/:id",
	autenticacionDeToken,
	deleteProductCategory
);

export default categoriesRouter;
