import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./clientApp";
import { User } from "../src/utils/types";
import { checkElementRequiredFields } from "./validationController";
import { FirebaseError } from "firebase/app";

const requiredFields = ["username", "password", "email", "birthDate"];

const isValidUser = (user: User) => {
  return checkElementRequiredFields(user, requiredFields);
};

const auth = getAuth();

export const postUser = async (user: User) => {
  if (isValidUser(user)) {
    try {
      const userCreated = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const userWithAdditionalFields = {
        ...user,
        id: userCreated.user.uid,
        recipes: [],
        favoritesRecipes: [],
      };
      await setDoc(
        doc(db, "users", userCreated.user.uid),
        userWithAdditionalFields
      );
      return userWithAdditionalFields;
    } catch (error: FirebaseError | any) {
      throw error;
    }
  } else {
    throw new Error("pendingRequieredFields");
  }
};

export const putUser = async (id: string, user: User) => {
  if (checkElementRequiredFields(user, requiredFields)) {
    await updateDoc(doc(db, "users", id), user);
    return `Usuario con ID ${id} actualizado.`;
  } else {
    throw new Error("Faltan campos obligatorios.");
  }
};
