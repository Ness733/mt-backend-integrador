import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const usersCategoryRouter = express.Router();

import {
	getAllCategories,
	saveUserCategory,
	deleteUserCategory,
} from "../controllers/userCategoryController.js";

usersCategoryRouter.get(
	"/categorias_usuario",
	autenticacionDeToken,
	getAllCategories
);
usersCategoryRouter.post(
	"/categorias_usuario",
	autenticacionDeToken,
	saveUserCategory
);
usersCategoryRouter.delete(
	"/categorias_usuario/:id",
	autenticacionDeToken,
	deleteUserCategory
);

export default usersCategoryRouter;
