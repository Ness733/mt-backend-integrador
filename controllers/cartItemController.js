// import CartItem from "../models/cart_item.js";
// import Products from "../models/product.js";
import { CartItem, Products } from "../models/index.js";

// Get Requests ///////////////////////////////////////////
export async function getAllCartItems(req, res) {
	try {
		let allCartItems = await CartItem.findAll({
			include: Products,
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
			message: `Se agregó el item al carrito nº ${newCartItem.id_cart} de ${req.username}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editCartItem(req, res) {
	let cartItemId = parseInt(req.params.id);
	try {
		let cartUpdate = await CartItem.findByPk(cartItemId);
		let cartItemIdProduct = await Products.findByPk(cartUpdate.id_product);
		if (!cartUpdate) {
			return res.status(204).json({ message: "El item no existe." });
		}
		await cartUpdate.update(req.body);

		res.status(201).json({
			message: `Item '${cartItemIdProduct.description}' actualizado.`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete requests ////////////////////////////////////////
export async function deleteCartItem(req, res) {
	let cartItemId = parseInt(req.params.id);
	let cartDelete = await CartItem.findByPk(cartItemId);
	let cartItemIdProduct = await Products.findByPk(cartDelete.id_product);

	try {
		await cartDelete.destroy();
		res.status(201).json({
			message: `Item ${cartItemIdProduct.description} eliminado.`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
