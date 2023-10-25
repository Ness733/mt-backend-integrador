import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Prodiver = db.define(
	"provider",
	{
		id_user: { type: DataTypes.INTEGER },
		cuit: { type: DataTypes.INTEGER },
	},
	{
		tableName: "providers",
		timestamps: false,
	}
);

export default Prodiver;
