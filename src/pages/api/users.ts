import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { postUser } from "../../../firebase/userController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "POST":
      try {
        const post = await postUser(req.body);
        res.status(201).json(post);
      } catch (error: Error | any) {
        res.status(400).json(error.code || error.message);
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
};

export default handler;
