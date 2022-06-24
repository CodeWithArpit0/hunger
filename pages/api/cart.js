import dbConnect from "../../util/mongo";
import user from "../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    const { userID } = req.body;
    const { ProductID } = req.body;

    try {
      const currentUser = await user.findById(userID);
      let DeletingProductTotal;

      const UpdatedCart = currentUser.cart.filter((product) => {
        if (product._id.toString() === ProductID) {
          DeletingProductTotal = product.total;
          return false;
        } else {
          return true;
        }
      });

      let cartTotal = currentUser.cartTotal - DeletingProductTotal;

      const item = await user.findByIdAndUpdate(userID, {
        $set: { cart: UpdatedCart, cartTotal: cartTotal },
      });

      res.status(201).json(currentUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    const { product } = req.body;
    const { cartTotal } = req.body;
    const { _id } = req.body;
    const { extras } = req.body;

    product.extraOptions = extras;
    try {
      if (product !== undefined) {
        const item = await user.findByIdAndUpdate(_id, {
          $push: { cart: product },
          $set: { cartTotal: cartTotal },
        });
        res.status(201).json(item);
      } else {
        const { cart } = req.body;
        const item = await user.findByIdAndUpdate(_id, {
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
