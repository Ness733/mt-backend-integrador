import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const ProductCategory = db.define(
	"cart_item",
	{
		id_product: { type: DataTypes.INTEGER },
		qty: { type: DataTypes.INTEGER },
		id_cart: { type: DataTypes.INTEGER },
	},
	{
		tableName: "cart_items",
		timestamps: false,
	}
);

export default ProductCategory;
