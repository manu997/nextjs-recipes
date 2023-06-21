import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import {
  deleteElementByIdAndType,
  getElementByIdAndType,
} from "../../../../firebase/elementController";
import { putUser } from "../../../../firebase/userController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET", "DELETE", "PUT"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "GET":
      try {
        const user = await getElementByIdAndType(req.query.id as string, "users");
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: "Usuario no encontrado" });
      }
      break;
    case "DELETE":
      await deleteElementByIdAndType(req.query.id as string, "users");
      res.status(200).json({ message: "success" });
      break;
    case "PUT":
      try {
        await putUser(req.query.id as string, req.body.user);
        res.status(201).json({ message: "success" });
      } catch (error) {
        res.status(400).json({ message: "Faltan datos obligatorios" });
      }
      break;
    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
};

export default handler;
