import jwt from "jsonwebtoken";

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
	req.username = payload.username;

	next();
}

export default autenticacionDeToken;
