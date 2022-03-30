import dbConnect from "../../../util/mongo";
import order from "../../../models/order";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  if (method === "GET") {
    try {
      const orders = await order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const orders = await order.create(req.body);
      res.status(201).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

export default handler;
