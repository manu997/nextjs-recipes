import { ComponentType } from "react";

export type Recipe = {
  id: string;
  chefName: string;
  name: string;
  people: number;
  preparationTime: number;
  ingredients: Array<Ingredient>;
  steps: Array<string>;
  image: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
  measure: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  birthdate: string;
  recipes?: Array<Recipe>;
  favoritesRecipes?: Array<Recipe>;
};

export type ButtonProps = {
  Icon: ComponentType;
  text: string;
  href: string;
};

export type CardsContainerProps = {
  recipes: Array<Recipe>;
};

export type RecipeCardProps = {
  recipe: Recipe;
};

export type HomeProps = {
  recipes: Array<Recipe>;
};

export type RecipePageProps = {
  recipe: Recipe;
};
