import bcrypt from "bcrypt";
import dbConnect from "../../util/mongo";
import user from "../../models/user";
import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body;

  await dbConnect();

  if (method === "POST") {
    try {
      const UserData = await user.findOne({ email });
      if (UserData) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          UserData.password
        );

        if (isPasswordCorrect) {
          const token = await UserData.generateAuthToken();
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("Hunger", token, {
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          );
          res.status(200).json(UserData);
        } else {
          res.status(401).send("Invalid Password");
        }
      } else {
        res.status(401).send("User doesn't exist!");
      }
    } catch (err) {
      console.log(err);
      res.status(401).json(err);
    }
  }
}
