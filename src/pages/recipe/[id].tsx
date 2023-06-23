import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAllElementsByType,
  getElementByIdAndType,
} from "../../../firebase/elementController";
import { Recipe, RecipePageProps } from "@/types";
import Banner from "@/components/Banner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

const RecipePage = ({ recipe }: RecipePageProps) => {
  return (
    <>
      <Banner />
      <div className="mx-auto my-5 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[45vw] 3xl:w-[30vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <img
          className="rounded-3xl mx-auto mt-5"
          src={recipe.image}
          alt={recipe.name}
        />
        <div className="mx-5">
          <div className="flex flex-col lg:flex-row lg:justify-between my-5">
            <p className="text-4xl text-gray-700 font-bold">{recipe.name}</p>
            <p className="text-xl text-gray-500 lg:self-end lg:m-0 my-5 font-semibold">
              Listo en {recipe.preparationTime} minutos
            </p>
          </div>
          <hr className="m-10 border border-gray-300" />
          <p className="text-4xl text-gray-700 font-bold">Ingredientes:</p>
          <ul className="list-outside list-disc ml-5">
            {recipe.ingredients.map((ingredient) => (
              <li className="text-xl text-gray-700 my-5">
                {ingredient.name}: {ingredient.quantity}
              </li>
            ))}
          </ul>
          <hr className="m-10 border border-gray-300" />
          <p className="text-4xl text-gray-700 font-bold">Pasos a seguir:</p>
          <ul className="list-outside list-decimal ml-5">
            {recipe.steps.map((step) => (
              <li className="text-xl text-gray-700 my-5">{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
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
