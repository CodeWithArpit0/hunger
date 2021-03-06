import dbConnect from "../../../util/mongo";
import product from "../../../models/product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const items = await product.findById(id);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not Authenticated!");
    }
    try {
      const item = await product.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(item);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
