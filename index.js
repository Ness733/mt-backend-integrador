// Dependencias
import db from "./db/connection.js";
import jwt from "jsonwebtoken";
// Modelos
import Product from "./models/product.js";
import User from "./models/user.js";
// import ProductCategory from "./models/product_category.js";
// import UserCategory from "./models/user_category.js";

import express from "express";

const app = express();
const exposedPort = 3000;

function autenticacionDeToken(req, res, next) {
	const headerAuthorization = req.headers["authorization"];
	const tokenRecibido = headerAuthorization.split(" ")[1];
	if (tokenRecibido == null) {
		return res.status(401).json({ message: "Token invalido." });
	}
	let payload = null;
	try {
		payload = jwt.verify(tokenRecibido, process.env.SECRET_KEY);
	} catch (error) {
		return res.status(401).json({ message: "Token invalido." });
	}

	if (Date.now() > payload.exp) {
		return res.status(401).json({ message: "Token expirado." });
	}

	req.user = payload.sub;
	req.userLevel = payload.userLevel;

	next();
}

// app.use(express.json());

app.use((req, res, next) => {
	if (req.method !== "POST" && req.method !== "PATCH") {
		return next();
	}
	if (req.headers["content-type"] !== "application/json") {
		return next();
	}

	let bodyTemp = "";

	req.on("data", (chunk) => {
		bodyTemp += chunk.toString();
	});

	req.on("end", () => {
		const data = JSON.parse(bodyTemp);
		req.body = data;

		next();
	});
});

app.post("/auth", async (req, res) => {
	const usuarioABuscar = req.body.username;
	const password = req.body.password;
	let usuarioEncontrado = "";
	try {
		usuarioEncontrado = await User.findAll({
			where: { username: usuarioABuscar },
		});
		if (usuarioEncontrado[0].password !== password) {
			console.log(usuarioEncontrado);
			return res.status(400).json({ message: "Password incorrecto." });
		}
	} catch (error) {
		res.status(400).json({ message: "Usuario no encontrado." });
	}

	const sub = usuarioEncontrado[0].id;
	const username = usuarioEncontrado[0].username;
	const userLevel = usuarioEncontrado[0].id_user_cat;

	const token = jwt.sign(
		{
			sub,
			username,
			userLevel,
			exp: Date.now() + 120 * 1000,
		},
		process.env.SECRET_KEY
	);

	res.status(200).json({ acessToken: token });
});

app.get("/", (req, res) => {
	res.status(200).send("Conexión exitosa");
});

// GET Requests
// Obtener usuarios DB

app.get("/usuarios/", async (req, res) => {
	try {
		let allUsers = await User.findAll();

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(204).json({ message: error });
	}
});

// Obtener productos DB
app.get("/productos/", async (req, res) => {
	try {
		let allProducts = await Product.findAll();

		res.status(200).json(allProducts);
	} catch (error) {
		res.status(204).json({ message: error });
	}
});

// Post Requests ////////////////////////////////////////////

app.post("/productos/", autenticacionDeToken, async (req, res) => {
	const userLevel = req.userLevel;

	if (userLevel !== 3) {
		res.status(401).json({
			message: "Se requieren permisos de administrador.",
		});
		return;
	}

	try {
		// datos.productos.push(req.body);
		const productoAGuardar = new Product(req.body);
		await productoAGuardar.save();

		res.status(201).json({ message: "success" });
	} catch (error) {
		res.status(204).json({ message: error });
	}
});

// Delete Requests ////////////////////////////////////////////

app.delete("/productos/:id", autenticacionDeToken, async (req, res) => {
	let idProducto = parseInt(req.params.id);
	let productoABorrar = await Product.findByPk(idProducto);

	const userLevel = req.userLevel;

	if (userLevel !== 3) {
		res.status(403).json({
			message: "Se requieren permisos de administrador.",
		});
		return;
	}

	try {
		productoABorrar.destroy();
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(204).json({ message: error });
	}
});

// Fin de Requests ////////////////////////////////////////////

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
