// import CartItem from "../models/cart_item.js";
// import Products from "../models/product.js";
import { CartItem } from "../models/index.js";
import { Products } from "../models/index.js";

// Get Requests ///////////////////////////////////////////
export async function getAllCartItems(req, res) {
	try {
		let allCartItems = await CartItem.findAll({
			include: {
				model: Products,
				as: "product",
			},
		});
		res.status(200).json(allCartItems);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneCartItem(req, res) {
	try {
		let cartItemId = parseInt(req.params.id);
		let cartItemFound = await CartItem.findAll({
			where: { id: cartItemId },
		});

		return res.status(200).json(cartItemFound);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post requests ////////////////////////////////////////
export async function saveCartItem(req, res) {
	try {
		const newCartItem = new CartItem(req.body);
		await newCartItem.save();

		res.status(201).json({
			message: `Se agregó el item al carrito ${newCartItem.id_cart} de ${req.username}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editCartItem(req, res) {
	let cartItemId = parseInt(req.params.id);
	try {
		let cartUpdate = await CartItem.findByPk(cartItemId);
		if (!cartUpdate) {
			return res.status(204).json({ message: "El item no existe." });
		}
		await cartUpdate.update(req.body);

		res.status(201).json({
			message: `Item ID:${cartUpdate} actualizado.`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete requests ////////////////////////////////////////
export async function deleteCartItem(req, res) {
	let cartItemId = parseInt(req.params.id);
	let cartDelete = await CartItem.findByPk(cartItemId);

	try {
		cartDelete.destroy();
		res.status(201).json({
			message: `Item ${cartDelete.id} eliminado.`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
