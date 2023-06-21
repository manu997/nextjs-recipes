import type { NextApiRequest, NextApiResponse } from "next";
import { postRecipe } from "../../../firebase/recipeController";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "POST":
      try {
        const post = await postRecipe(req.body);
        res.status(201).json({ message: post });
      } catch (error: any) {
        res.status(400).json({ message: error });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
};

export default handler;
