import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Products = db.define(
	"product",
	{
		id_product_cat: { type: DataTypes.INTEGER },
		description: { type: DataTypes.STRING },
		price_list: { type: DataTypes.FLOAT },
		stock: { type: DataTypes.INTEGER },
		id_provider: { type: DataTypes.INTEGER },
		price_public: { type: DataTypes.FLOAT },
	},
	{
		tableName: "products",
		timestamps: false,
	}
);

export default Products;
