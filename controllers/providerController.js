import Provider from "../models/provider.js";
import { Users } from "../models/index.js";

// Get Requests ///////////////////////////////////////////
export async function getAllProviders(req, res) {
	try {
		let allProviders = await Provider.findAll({ include: [Users] });
		res.status(200).json(allProviders);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneProvider(req, res) {
	try {
		let providerId = parseInt(req.params.id);
		let providerFound = await Provider.findByPk(providerId, {
			include: [Users],
		});

		res.status(200).json(providerFound);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post requests ////////////////////////////////////////
export async function saveProvider(req, res) {
	if (req.userLevel !== 3) {
		return res.status(401).json({
			message: "No tiene permisos para realizar esta acción.",
		});
	}

	try {
		const newProvider = new Provider(req.body);
		await newProvider.save();

		res.status(200).json({
			message: `Se ha agregado el proveedor ${newProvider.cuit}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editProvider(req, res) {
	let providerId = parseInt(req.params.id);
	if (req.userLevel !== 3) {
		return res.status(401).json({
			message: "No tiene permisos para realizar esta acción.",
		});
	}

	try {
		let providerUpdate = await Provider.findByPk(providerId);

		await providerUpdate.update(req.body);
		res.status(200).json({
			message: `Se ha actualizado el proveedor ${providerUpdate.cuit}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete requests ////////////////////////////////////////
export async function deleteProvider(req, res) {
	if (req.userLevel !== 3) {
		return res.status(401).json({
			message: "No tiene permisos para realizar esta acción.",
		});
	}
	let providerId = parseInt(req.params.id);

	try {
		let providerDelete = await Provider.findByPk(providerId);
		if (!providerDelete) {
			return res.status(204).json({ message: "El proveedor no existe." });
		}
		await providerDelete.destroy();

		res.status(200).json({
			message: `Se ha eliminado el proveedor ${providerDelete.cuit}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
