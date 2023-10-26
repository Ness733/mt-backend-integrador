import express from "express";
import autenticacionDeToken from "../middleware/tokenAuthentication.js";

const usersRouter = express.Router();

import {
	getAllUsers,
	getOneUser,
	saveUser,
	editUser,
	deleteUser,
} from "../controllers/usersController.js";

usersRouter.get("/usuarios", getAllUsers);
usersRouter.get("/usuarios/:id", getOneUser);
usersRouter.post("/usuarios", saveUser);
usersRouter.patch("/usuarios/:id", autenticacionDeToken, editUser);
usersRouter.delete("/usuarios/:id", autenticacionDeToken, deleteUser);

export default usersRouter;
