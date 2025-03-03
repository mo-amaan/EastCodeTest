import jwt from "jsonwebtoken";

function auMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Missing Token" });
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({ messsag: "Token is not Valid" });
    }
    req.userId = decoded.id;
    next();
  });
}

export default auMiddleware;
