import User from "../../models/user";
import dbConnect from "../../util/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const { password } = req.body;
  await dbConnect();

  if (method === "POST") {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;

      const newUser = new User(req.body);
      await newUser.generateAuthToken();
      await newUser.save();

      res.status(201).json("Registration succesfull");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
