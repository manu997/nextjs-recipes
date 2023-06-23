import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAllElementsByType,
  getElementByIdAndType,
} from "../../../firebase/elementController";
import { Recipe, RecipePageProps } from "@/types";

const RecipePage = ({ recipe }: RecipePageProps) => {
  return <p>{recipe.name}</p>;
};

export default RecipePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getAllElementsByType("recipes");
  const recipesIds = recipes.map((recipe) => recipe.id);
  return {
    paths: recipesIds.map((id) => ({ params: { id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const recipe = await getElementByIdAndType(
    context.params?.id as string,
    "recipes"
  );
  return { props: { recipe: recipe as Recipe } };
};
