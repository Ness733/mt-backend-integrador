import { Cart, CartItem, Users, Products } from "../models/index.js";

// Get Requests ///////////////////////////////////////////

// Funcion que calcula el costo total de cada carrito.
const calculateTotal = (cart) => {
	let total = 0;
	cart.cart_items.forEach((cartItem) => {
		const itemCost = cartItem.qty * cartItem.product.price_public;
		total += itemCost;
	});
	cart.dataValues.cartTotal = total;
};

export async function getAllCarts(req, res) {
	try {
		let allCarts = await Cart.findAll({
			include: [
				{
					model: CartItem,
					include: [Products],
				},
				{
					model: Users,
					attributes: ["username", "email"],
				},
			],
		});

		allCarts.forEach((cart) => {
			calculateTotal(cart);
		});

		res.status(200).json(allCarts);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneCart(req, res) {
	try {
		let cartId = parseInt(req.params.id);
		let cartFound = await Cart.findAll({
			where: { id: cartId },
			include: [
				{
					model: CartItem,
					include: [
						{
							model: Products,
						},
					],
				},
				{
					model: Users,
					attributes: ["username", "email"],
				},
			],
		});

		cartFound.forEach((cart) => {
			calculateTotal(cart);
		});

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
