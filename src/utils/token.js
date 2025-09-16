import jwt from "jsonwebtoken";

export function createToken(payload, expiry = 1) {
  const token = jwt.sign(payload, process.env.JWT_SECERET);
  const today = new Date();
  expiry = today.setHours(today.getHours() + expiry);

  return { token, expiry };
}

export function decodeToken(token) {
  return jwt.decode(token, process.env.JWT_SECERET);
}
