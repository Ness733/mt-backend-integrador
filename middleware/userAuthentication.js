import jwt from "jsonwebtoken";
import User from "../models/user.js";
async function authentication(req, res) {
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
			exp: Date.now() + 240 * 1000,
		},
		process.env.SECRET_KEY
	);

	res.status(200).json({ acessToken: token });
}

export default authentication;
