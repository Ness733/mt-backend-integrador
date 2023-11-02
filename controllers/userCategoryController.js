import { UserCategory } from "../models/index.js";

// GET Requests ////////////////////////////////////////
export async function getAllCategories(req, res) {
	if (req.userLevel !== 1) {
		res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
	}

	try {
		let allCategories = await UserCategory.findAll();
		res.status(200).json(allCategories);
	} catch (error) {
		res.status(204).json({ message: error.message });
	}
}

// POST Requests //////////////////////////////////////
export async function saveUserCategory(req, res) {
	if (req.userLevel !== 3) {
		return res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
	}

	try {
		const categoriaAGuardar = new UserCategory(req.body);
		await categoriaAGuardar.save();

		res.status(201).json({
			message: `Se ha guardado la categoria ${categoriaAGuardar.category}`,
		});
	} catch (error) {
		res.status(204).json({ message: error.message });
	}
}

// DELETE Requests ////////////////////////////////////
export async function deleteUserCategory(req, res) {
	if (req.userLevel !== 3) {
		return res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
	}

	let categoryID = parseInt(req.params.id);
	let categoryDelete = await UserCategory.findByPk(categoryID);

	try {
		await categoryDelete.destroy();
		res.status(201).json({
			message: `Se ha eliminado la categoria ${categoryDelete.category}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
