import dbConnect from "../../../util/mongo";
import order from "../../../models/order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await order.findById(id);
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const item = await order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(item);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
