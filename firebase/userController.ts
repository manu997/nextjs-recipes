import {
  collection,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./clientApp";
import { User } from "../src/types";
import { checkElementRequiredFields } from "./validationController";

const requiredFields = [
  "username",
  "password",
  "birthDate",
  "phoneNumber",
];

export const postUser = async (user: User) => {
  if (checkElementRequiredFields(user, requiredFields)) {
    const docRef = await addDoc(collection(db, "users"), user);
    return `Usuario con ID ${docRef.id} creado.`;
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
