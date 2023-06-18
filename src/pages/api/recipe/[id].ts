import type { NextApiRequest, NextApiResponse } from "next";
import { putRecipe } from "../../../../firebase/recipeController";
import NextCors from "nextjs-cors";
import {
  deleteElementByIdAndType,
  getElementByIdAndType,
} from "../../../../firebase/elementController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET", "DELETE", "PUT"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "GET":
      try {
        const recipe = await getElementByIdAndType(req.body.id, "recipes");
        res.status(200).json(recipe);
      } catch (error: any) {
        res.status(400).json({ message: error });
      }
      break;
    case "DELETE":
      await deleteElementByIdAndType(req.body.id, "recipes");
      res.status(200).json({ message: "success" });
      break;
    case "PUT":
      try {
        await putRecipe(req.body.id, req.body.recipe);
        res.status(201).json({ message: "success" });
      } catch (error: any) {
        res.status(400).json({ message: error });
      }
      break;
    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
};

export default handler;
