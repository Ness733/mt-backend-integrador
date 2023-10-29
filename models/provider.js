import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Provider = db.define(
	"provider",
	{
		id_user: { type: DataTypes.INTEGER },
		cuit: { type: DataTypes.INTEGER },
	},
	{
		tableName: "provider",
		timestamps: false,
	}
);

export default Provider;
