// Dependencias
import db from "./db/connection.js";
import express from "express";

import makeBody from "./middleware/body.js";
import authentication from "./middleware/userAuthentication.js";

// Routers
import productsRouter from "./routes/productsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import cartRouter from "./routes/cartRouter.js";
import cartItemRouter from "./routes/cartItemRouter.js";
import categoriesRouter from "./routes/productCategoryRouter.js";
import providerRouter from "./routes/providerRouter.js";
import salesRouter from "./routes/salesRouter.js";

const app = express();
const exposedPort = 3000;

app.get("/", (req, res) => {
	res.status(200).send("Conexión exitosa");
});

// Body
app.use(makeBody);

// Routes
app.use("/", productsRouter);
app.use("/", usersRouter);
app.use("/", cartRouter);
app.use("/", cartItemRouter);
app.use("/", categoriesRouter);
app.use("/", providerRouter);
app.use("/", salesRouter);

// Endpoint validación logueo
app.post("/auth", authentication);

app.use((req, res) => {
	res.status(404).send("<h1>404</h1>");
});

try {
	await db.authenticate().then(() => {
		return db.query("SET TIME ZONE 'GMT-3';", { raw: true });
	});
	console.log("Conexión establecida");
} catch (error) {
	console.log("Algo salió mal" + error);
}

app.listen(exposedPort, () => {
	console.log("Servidor escuchando en http://localhost:" + exposedPort);
});
