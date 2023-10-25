import { Sequelize } from "sequelize";

import doenv from "dotenv";

doenv.config();

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: "motty.db.elephantsql.com",
		dialect: "postgres",
		logging: true,
	}
);

export default db;
