import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "./clientApp";
import { Recipe } from "../src/types";
import { checkElementRequiredFields } from "./validationController";

const requiredFields = [
  "chefId",
  "name",
  "preparationTime",
  "people",
  "ingredients",
  "steps",
];

export const postRecipe = async (recipe: Recipe) => {
  if (checkElementRequiredFields(recipe, requiredFields)) {
    const docRef = await addDoc(collection(db, "recipes"), recipe);
    return `Receta con ID ${docRef.id} creada.`;
  } else {
    throw new Error("Faltan campos obligatorios.");
  }
};

export const putRecipe = async (id: string, recipe: Recipe) => {
  if (checkElementRequiredFields(recipe, requiredFields)) {
    await updateDoc(doc(db, "recipes", id), recipe);
    return `Receta con ID ${id} actualizada.`;
  } else {
    throw new Error("Faltan campos obligatorios.");
  }
};
