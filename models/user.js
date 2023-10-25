import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Users = db.define(
	"user",
	{
		first_name: { type: DataTypes.STRING },
		last_name: { type: DataTypes.STRING },
		username: { type: DataTypes.STRING },
		email: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING },
		id_user_cat: { type: DataTypes.INTEGER },
	},
	{
		tableName: "users",
		timestamps: false,
	}
);

export default Users;
