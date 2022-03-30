import jwt from "jsonwebtoken";
import User from "../../models/user";

export default async function authenticate(req, res, next) {
  try {
    const token = req.cookies.Hunger;
    console.log(token);
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
}
