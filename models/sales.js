import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Sales = db.define(
	"sales",
	{
		created_at: { type: DataTypes.DATE },
		id_cart: { type: DataTypes.INTEGER },
	},
	{
		tableName: "sales",
		timestamps: false,
		createdAt: true,
	}
);

export default Sales;
