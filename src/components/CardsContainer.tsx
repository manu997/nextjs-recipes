import { CardsContainerProps } from "@/types";
import RecipeCard from "./RecipeCard";

const CardsContainer = ({ recipes }: CardsContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-cols-auto gap-4 justify-items-center 3xl:mx-[20vw] 2xl:mx-96 xl:mx-72 lg:mx-12 sm:mx-20 m-10">
      {recipes.map((recipe, key) => (
        <RecipeCard key={key} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardsContainer;
