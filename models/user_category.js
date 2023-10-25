import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const UserCategory = db.define(
	"user_category",
	{
		category: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
	},
	{
		tableName: "user_category",
		timestamps: false,
	}
);

export default UserCategory;
