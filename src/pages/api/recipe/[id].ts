import type { NextApiRequest, NextApiResponse } from "next";
import { putRecipe } from "../../../../firebase/recipeController";
import NextCors from "nextjs-cors";
import {
  deleteElementByIdAndType,
} from "../../../../firebase/elementController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["DELETE", "PUT"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "DELETE":
      await deleteElementByIdAndType(req.query.id as string, "recipes");
      res.status(200).json({ message: "success" });
      break;
    case "PUT":
      try {
        await putRecipe(req.query.id as string, req.body.recipe);
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
