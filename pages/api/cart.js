import dbConnect from "../../util/mongo";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { _id } = req.body;

  await dbConnect();

  // if (method === "POST") {
  //   try {
  //     const user = await User.findById(_id);
  //     res.status(201).json(user.cart);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // }
  if (method === "PUT") {
    const { product } = req.body;
    const { cartTotal } = req.body;
    try {
      if (product !== undefined) {
        const item = await User.findByIdAndUpdate(_id, {
          $push: { cart: product },
          $set: { cartTotal: cartTotal },
        });
        res.status(201).json(item);
      } else {
        const { cart } = req.body;
        const item = await User.findByIdAndUpdate(_id, {
          $set: { cart: cart, cartTotal: cartTotal },
        });
        res.status(201).json(item);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
