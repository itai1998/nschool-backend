import jwt from "jsonwebtoken";

let refreshTokens = [];

const generateAccessToke = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

export const login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = { name: username };
    const accessToken = generateAccessToke(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
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

export const getRefreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null)
    return res.status(401).json({ message: "Unauthorized" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Forbidden" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const accessToken = generateAccessToke({ name: user.name });
    res.json({ accessToken: accessToken });
  });
};

export const logout = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};
