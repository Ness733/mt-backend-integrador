import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Sales = db.define(
	"sales",
	{
		date: { type: DataTypes.DATE },
		id_cart: { type: DataTypes.INTEGER },
	},
	{
		tableName: "sales",
		timestamps: false,
	}
);

export default Sales;
