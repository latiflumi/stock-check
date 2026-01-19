import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.cookies?.refreshToken;
  console.log("COOKIES:", req.cookies);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

