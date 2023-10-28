import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const CartItem = db.define(
	"cart_item",
	{
		id_product: { type: DataTypes.INTEGER },
		qty: { type: DataTypes.INTEGER },
		id_cart: { type: DataTypes.INTEGER },
	},
	{
		tableName: "cart_item",
		timestamps: false,
	}
);

export default CartItem;
