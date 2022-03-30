import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    res.setHeader("Set-Cookie", cookie.serialize("Hunger", "", { path: "/" }));
    res.status(200).json("Logout Successful");
  }
}
