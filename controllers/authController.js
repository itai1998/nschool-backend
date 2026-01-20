import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
  } catch (err) {
    console.error("POST /login error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};
