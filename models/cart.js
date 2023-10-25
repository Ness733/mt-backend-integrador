import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Cart = db.define(
	"cart",
	{
		id_user: { type: DataTypes.INTEGER },
	},
	{
		tableName: "carts",
		timestamps: false,
	}
);

export default Cart;
