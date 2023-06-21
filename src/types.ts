import { ComponentType } from "react";

export type Recipe = {
  id: string;
  chefName: string;
  name: string;
  people: number;
  preparationTime: number;
  ingredients: Array<string>;
  steps: Array<string>;
  image: string;
};

export type Ingredient = {
  name: string;
  quantity: number; 
}

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  birthdate: string;
  recipes?: Array<Recipe>;
  favoritesRecipes?: Array<Recipe>;
}

export type Button = {
  Icon: ComponentType;
  text: string;
}

export type CardsContainerProps = {
  recipes: Array<Recipe>;
}

export type RecipeCardProps = {
  recipe: Recipe;
}

export type HomeProps<T> = {
  recipes: Array<Recipe>;
}