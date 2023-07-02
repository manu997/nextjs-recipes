import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        res
          .status(200)
          .json(userCredential.user);
      } catch (error: Error | any) {
        res.status(400).json({ code: error.code, message: error.message });
      }
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
};

export default handler;
