import { CardsContainerProps } from "@/types";
import RecipeCard from "./RecipeCard";

const CardsContainer = ({ recipes }: CardsContainerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 justify-items-center 2xl:mx-96 xl:mx-32 lg:mx-12 sm:mx-20 m-10">
      {recipes?.map((recipe, key) => (
        <RecipeCard key={key} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardsContainer;
