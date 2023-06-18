import { ComponentType } from "react";

export type Recipe = {
  id: string;
  chefId: string,
  name: string;
  people: number;
  preparationTime: number;
  ingredients: Array<string>;
  steps: Array<string>;
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