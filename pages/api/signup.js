import User from "../../models/user";
import dbConnect from "../../util/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const { password, email } = req.body;

  await dbConnect();

  if (method === "POST") {
    try {
      // * Validating the email address
      const isEmailValid = ValidateEmail(email);
      if (isEmailValid) {
        // * Checking user is not exist with the email
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
          res.status(401).json("User already exist!");
        } else {
          // * Encrypting the password
          const hashedPassword = await bcrypt.hash(password, 10);
          req.body.password = hashedPassword;

          const newUser = new User(req.body);
          await newUser.generateAuthToken();
          await newUser.save();

          res.status(201).json("Registration successfull");
        }
      } else {
        res.status(400).json("Please enter a valid email address");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
}
