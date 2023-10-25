import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const ProductCategory = db.define(
	"product_category",
	{
		category: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
	},
	{
		tableName: "product_category",
		timestamps: false,
	}
);

export default ProductCategory;
