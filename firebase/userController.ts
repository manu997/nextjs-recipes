import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./clientApp";
import { User } from "../src/types";
import { checkElementRequiredFields } from "./validationController";

const requiredFields = ["username", "password", "email", "birthDate"];

const isValidUser = (user: User) => {
  return (
    checkElementRequiredFields(user, requiredFields) && user.password.length > 6
  );
};

const auth = getAuth();

export const postUser = async (user: User) => {
  if (isValidUser(user)) {
    try {
      return await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
    } catch (error) {
      throw new Error("Error al crear el usuario.");
    }
  } else {
    throw new Error("Faltan campos obligatorios.");
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
