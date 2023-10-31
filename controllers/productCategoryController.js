import ProductCategory from "../models/product_category.js";

// Get Requests ///////////////////////////////////////////
export async function getAllProductCategories(req, res) {
	try {
		let allProductCategories = await ProductCategory.findAll();

		res.status(200).json(allProductCategories);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
export async function getOneProductCategories(req, res) {
	let idProductCategory = parseInt(req.params.id);
	try {
		let oneProductCategories = await ProductCategory.findByPk(
			idProductCategory
		);

		res.status(200).json(oneProductCategories);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// Post Requests //////////////////////////////////////////
export async function saveProductCategory(req, res) {
	if (req.userLevel !== 2) {
		return res.status(401).json({
			message: "Se requieren permisos de proveedor.",
		});
	}

	try {
		const newProductCategory = new ProductCategory(req.body);
		await newProductCategory.save();
		res.status(201).json({
			message: `Se ha guardado la categoria de producto ${newProductCategory.category}`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editProductCategory(req, res) {
	if (req.userLevel !== 2) {
		res.status(401).json({
			message: "Se requieren permisos de proveedor.",
		});
		return;
	}

	try {
		let idProductCategory = parseInt(req.params.id);
		let productCateogoryId = await ProductCategory.findByPk(
			idProductCategory
		);
		if (!productCateogoryId) {
			return res
				.status(204)
				.json({ message: "La categoria de producto no existe." });
		}
		await productCateogoryId.update(req.body);
		res.status(201).json({
			message: `Se ha actualizado la categoria de producto '${productCateogoryId.dataValues.category}'`,
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

// DELETE Requests //////////////////////////////////////////
export async function deleteProductCategory(req, res) {
	let idProductCategory = parseInt(req.params.id);
	if (req.userLevel !== 3) {
		res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
		return;
	}

	try {
		let productCategoryDelete = await ProductCategory.findByPk(
			idProductCategory
		);
		if (!productCategoryDelete) {
			return res
				.status(204)
				.json({ message: "La categoria de producto no existe." });
		}
		await productCategoryDelete.destroy();
		res.status(201).json({
			message: "Categoría de producto eliminada.",
		});
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
