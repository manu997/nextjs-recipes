import { useQuery } from "@tanstack/react-query";

const getAllRecipes = async () => {
  const apiUrl = `/api/recipes`;
  const recipes = await fetch(apiUrl);
  const recipesJson: Array<any> = await recipes.json();
  return recipesJson;
};

const useRecipes = () => useQuery(["recipes"], () => getAllRecipes());

export default useRecipes;
