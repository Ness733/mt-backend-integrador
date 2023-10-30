// import CartItem from "../models/cart_item.js";
// import Products from "../models/product.js";
import { CartItem, Products, Cart } from "../models/index.js";

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
	// Se busca el carrito del usuario haciendo la request
	const cartId = await Cart.findAll({
		where: { id_user: req.user },
	});

	// Si no existe el carrito, se crea con el ID del usuario
	if (cartId.length === 0) {
		let newCart = new Cart({
			id_user: req.user,
		});
		await newCart.save();
		// Se ejecuta la función otra vez
		saveCartItem();
	}

	try {
		console.log(cartId[0].id);
		const newCartItem = new CartItem(req.body);
		// Agrega el id del carrito al body de la request
		newCartItem.id_cart = cartId[0].id;

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
