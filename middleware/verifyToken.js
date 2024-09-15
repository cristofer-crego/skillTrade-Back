const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token; //obtener token de las cookies

    if (!token) {
      return res.status(401).json({ error: 'No estás autenticado' });
    }

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }
      req.user = decoded; //datos del usuario en el request
      next(); //siguiente función del middleware o ruta
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = verifyToken;