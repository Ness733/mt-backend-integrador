import { Sales, Cart, CartItem, Products } from "../models/index.js";

// Get Requests ////////////////////////////

const calculateSaleTotal = (sale) => {
	let total = 0;
	sale.cart.cart_items.forEach((cartItem) => {
		const itemCost = cartItem.qty * cartItem.product.price_public;
		total += itemCost;
	});
	sale.dataValues.saleValue = total;
};

export async function getAllSales(req, res) {
	try {
		let allSales = await Sales.findAll({
			include: [
				{
					model: Cart,
					attributes: ["id", "id_user"],
					include: [
						{
							model: CartItem,
							attributes: ["id", "qty", "id_product"],
							include: [
								{
									model: Products,
									attributes: [
										"id",
										"description",
										"price_public",
									],
								},
							],
						},
					],
				},
			],
		});

		allSales.forEach((sale) => {
			calculateSaleTotal(sale);
		});

		res.status(200).json(allSales);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneSale(req, res) {
	try {
		let saleId = parseInt(req.params.id);
		let saleFound = await Sales.findAll({
			where: { id: saleId },
			include: [
				{
					model: Cart,
					attributes: ["id_user"],
					include: [
						{
							model: CartItem,
							attributes: ["qty"],
							include: [
								{
									model: Products,
									attributes: ["description", "price_public"],
								},
							],
						},
					],
				},
			],
		});

		saleFound.forEach((sale) => {
			calculateSaleTotal(sale);
		});

		res.status(200).json(saleFound);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post Requests //////////////////////////
export async function saveSale(req, res) {
	if (req.userLevel !== 1) {
		return res.status(401).json({
			message: "No tiene permisos para realizar esta acción.",
		});
	}
	try {
		let newSale = await Sales.create(req.body);
		res.status(201).json({
			message: `Se ha creado la venta ${newSale.id}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete Requests ////////////////////////
export async function deleteSale(req, res) {
	if (req.userLevel !== 3) {
		return res.status(401).json({
			message: "No tiene permisos para realizar esta accion.",
		});
	}
	let saleId = parseInt(req.params.id);
	let saleDelete = await Sales.findByPk(saleId);
	try {
		await saleDelete.destroy();
		res.status(200).json({
			message: `Se ha eliminado la venta ${saleDelete.id}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
