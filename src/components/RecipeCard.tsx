import { RecipeCardProps } from "@/utils/types";
import Link from "next/link";

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link className="md:h-auto w-full" href={`/recipe/${recipe.id}`}>
      <div className="shadow-md rounded-3xl flex flex-col md:h-full h-fit ">
        <img
          src={recipe.image}
          className="rounded-t-3xl h-[65%] min-h-[65%]"
          alt={recipe.name}
        />
        <div className="pr-5 flex flex-col h-[-webkit-fill-available] justify-between m-5">
          <p className="text-2xl font-bold text-gray-700 break-words">
            {recipe.name}
          </p>
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-md font-medium text-gray-500">
                {recipe.chefName}
              </p>
            </div>
            <p className="text-md font-medium text-gray-500">
              {recipe.preparationTime} min.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
