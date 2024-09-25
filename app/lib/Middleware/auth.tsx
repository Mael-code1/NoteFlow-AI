import jwt from "jsonwebtoken";
import second, { serialize } from "cookie";
export default function LoginHeader(req, res) {
  if (email === "admin@local.local" && password === "admin") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username: "ivan",
      },
        email: "admin@local.local",
      "secret"
    );
    const serias = serialize('mytokenname',token)
    res.setHeader("set-header", serias);
    return res.json("login router");
  }
}
