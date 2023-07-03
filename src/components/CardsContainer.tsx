import { CardsContainerProps } from "@/utils/types";
import RecipeCard from "./RecipeCard";

const CardsContainer = ({ recipes }: CardsContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-cols-auto gap-4 justify-items-center 3xl:mx-[25vw] 2xl:mx-80 xl:mx-60 lg:mx-12 sm:mx-16 my-5 rounded-3xl shadow-2xl bg-white p-10">
      {recipes.map((recipe, key) => (
        <RecipeCard key={key} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardsContainer;
