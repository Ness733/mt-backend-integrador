import Product from "../models/product.js";

// Get Requests ///////////////////////////////////////////
export async function getAllProducts(req, res) {
	try {
		let allProducts = await Product.findAll();

		res.status(200).json(allProducts);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneProduct(req, res) {
	try {
		let productId = parseInt(req.params.id);
		let productFound = await Product.findByPk(productId);

		res.status(200).json(productFound);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post Requests ////////////////////////////////////////////

export async function saveProduct(req, res) {
	const userLevel = req.userLevel;

	if (userLevel !== 3) {
		res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
		return;
	}

	try {
		const productoAGuardar = new Product(req.body);
		await productoAGuardar.save();

		res.status(201).json({
			message: `Se ha guardado el producto ${productoAGuardar.description}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editProduct(req, res) {
	const userLevel = req.userLevel;

	if (userLevel !== 3 || userLevel !== 2) {
		res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
		return;
	}

	let productId = parseInt(req.params.id);

	try {
		let productUpdate = await Product.findByPk(productId);

		if (!productUpdate) {
			return res.status(204).json({ message: "El producto no existe." });
		}

		await productUpdate.update(req.body);

		res.status(201).json({
			message: `Producto "${productUpdate[0].description}" actualizado.`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Delete Requests ////////////////////////////////////////////

export async function deleteProduct(req, res) {
	let idProducto = parseInt(req.params.id);
	let productoABorrar = await Product.findByPk(idProducto);

	const userLevel = req.userLevel;

	if (userLevel !== 3) {
		res.status(403).json({
			message: "Se requieren permisos de administrador.",
		});
		return;
	}

	try {
		productoABorrar.destroy();
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
