// Dependencias
import db from "./db/connection.js";
import express from "express";

import makeBody from "./middleware/body.js";
import authentication from "./middleware/userAuthentication.js";

import productsRouter from "./routes/productsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import cartRouter from "./routes/cartRouter.js";

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

// Endpoint validación logueo
app.post("/auth", authentication);

app.use((req, res) => {
	res.status(404).send("<h1>404</h1>");
});

try {
	await db.authenticate();
	console.log("Conexión establecida");
} catch (error) {
	console.log("Algo salió mal" + error);
}

app.listen(exposedPort, () => {
	console.log("Servidor escuchando en http://localhost:" + exposedPort);
});
