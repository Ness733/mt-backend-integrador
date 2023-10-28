import { Cart } from "../models/index.js";

// Get Requests ///////////////////////////////////////////
export async function getAllCarts(req, res) {
	try {
		let allCarts = await Cart.findAll();
		res.status(200).json(allCarts);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneCart(req, res) {
	try {
		let cartId = parseInt(req.params.id);
		let cartFound = await Cart.findByPk(cartId);

		res.status(200).json(cartFound);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post Requests ////////////////////////////////////////////
export async function saveCart(req, res) {
	if (req.user !== req.body.id_user) {
		return res.status(401).json({
			message: "No tiene permisos para realizar esta accion.",
		});
	}
	try {
		const newCart = new Cart(req.body);
		await newCart.save();

		res.status(201).json({
			message: "Se ha generado el nuevo carrito de " + req.username,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete Requests ///////////////////////////////////////////
export async function deleteCart(req, res) {
	let cartId = parseInt(req.params.id);
	let cartDelete = await Cart.findByPk(cartId);

	if (req.user !== cartDelete.id_user) {
		return res
			.status(204)
			.json({ message: "No tiene permisos para realizar esta accion." });
	}
}
