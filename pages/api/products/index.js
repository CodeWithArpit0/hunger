import dbConnect from "../../../util/mongo";
import Product from "../../../models/product";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const items = await Product.find();
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
      console.log("After error");
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not Authenticated!");
    }
    try {
      const items = await Product.create(req.body);
      res.status(201).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
