import User from "../models/user.js";

// Get Requests ////////////////////////////////////////////
export async function getAllUsers(req, res) {
	try {
		let allUsers = await User.findAll();

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneUser(req, res) {
	try {
		let userId = parseInt(req.params.id);
		let userFound = await User.findByPk(userId);

		req.status(200).json(userFound);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post Requests ////////////////////////////////////////////

export async function saveUser(req, res) {
	try {
		const newUser = new User(req.body);
		await newUser.save();

		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editUser(req, res) {
	try {
		let userId = parseInt(req.params.id);
		let userUpdate = await User.findByPk(userId);

		// Validación de permisos para modificar usuario.
		// Solamente el usuario puede editar su propia información.
		if (req.username !== userUpdate.username) {
			return res.status(401).json({
				message: "No tiene permisos para editar este usuario.",
			});
		}

		if (!userUpdate) {
			return res.status(204).json({ message: "El usuario no existe." });
		}

		await userUpdate.update(req.body);

		res.status(200).json({
			message: `Usuario "${userUpdate.username}" actualizado.`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete Requests ////////////////////////////////////////////

export async function deleteUser(req, res) {
	try {
		let userId = parseInt(req.params.id);
		let userDelete = await User.findByPk(userId);

		if (req.userLevel !== 3 || req.username !== userDelete.username) {
			return res.status(401).json({
				message: "No tiene permisos para eliminar este usuario.",
			});
		}

		if (!userDelete) {
			return res.status(204).json({ message: "El usuario no existe." });
		}

		await userDelete.destroy();
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
