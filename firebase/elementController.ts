import {
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "./clientApp";
import { Element } from "@/utils/types";

export const getAllElementsByType = async (type: string) => {
  const querySnapshot = await getDocs(collection(db, type));
  return querySnapshot.docs.map((doc) => {
    const element: Element = {
      id: doc.id,
      ...doc.data(),
    };
    return element;
  });
};

export const getElementByIdAndType = async (id: string, type: string) => {
  const docRef = doc(db, type, id);
  const querySnapshot = await getDoc(docRef);
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  } else {
    throw new Error(`No existe ningún elemento con ID ${id} en ${type}`);
  }
};

export const deleteElementByIdAndType = async (id: string, type: string) => {
  const docRef = doc(db, type, id);
  await deleteDoc(docRef);
  return `Elemento con ID ${id} eliminado correctamente de ${type}`;
};
