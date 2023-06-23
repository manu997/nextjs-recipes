import type { NextApiRequest, NextApiResponse } from "next";
import { postRecipe } from "../../../firebase/recipeController";
import NextCors from "nextjs-cors";
import { getAllElementsByType } from "../../../firebase/elementController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET ", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "GET":
      const recipes = await getAllElementsByType("recipes");
      return res.status(200).json({ recipes });
    case "POST":
      try {
        const post = await postRecipe(req.body);
        res.status(201).json({ message: post });
      } catch (error: Error | any) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
};

export default handler;
