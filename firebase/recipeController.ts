import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "./clientApp";
import { Recipe } from "../src/utils/types";
import { checkElementRequiredFields } from "./validationController";
import { FirebaseError } from "firebase/app";

const requiredFields = [
  "image",
  "chefName",
  "name",
  "preparationTime",
  "people",
  "ingredients",
  "steps",
];

export const postRecipe = async (recipe: Recipe) => {
  if (checkElementRequiredFields(recipe, requiredFields)) {
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipe);
      return `Receta con ID ${docRef.id} creada.`;
    } catch (error: FirebaseError | any) {
      throw error;
    }
  } else {
    throw new Error("pendingRequieredFields");
  }
};

export const putRecipe = async (id: string, recipe: Recipe) => {
  if (checkElementRequiredFields(recipe, requiredFields)) {
    await updateDoc(doc(db, "recipes", id), recipe);
    return `Receta con ID ${id} actualizada.`;
  } else {
    throw new Error("pendingRequieredFields");
  }
};
