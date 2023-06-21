import { Recipe, RecipeCardProps } from "@/types";

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="shadow-lg rounded-3xl md:w-5/6 xl:w-11/12 3xl:w-5/6">
      <img src={recipe.image} className="rounded-t-3xl" alt={recipe.name} />
      <div className="pr-5 flex flex-col gap-3 m-5">
        <p className="text-2xl font-bold text-gray-700">{recipe.name}</p>
        <div className="flex justify-between">
          <p className="text-md font-medium text-gray-500">{recipe.chefName}</p>
          <p className="text-md font-medium text-gray-500">
            {recipe.preparationTime} min.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
