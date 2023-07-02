import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAllElementsByType,
  getElementByIdAndType,
} from "../../../firebase/elementController";
import { User, UserPageProps } from "@/types";

const UserPage = ({ user }: UserPageProps) => {
  return (
    <div>
      {user.id} - {user.username}
    </div>
  );
};

export default UserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await getAllElementsByType("users");
  const usersIds = users.map((user) => user.id);
  return {
    paths: usersIds.map((id) => ({ params: { id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const user = await getElementByIdAndType(
    context.params?.id as string,
    "users"
  );
  return { props: { user: user as User } };
};
