import {
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "./clientApp";
import { Recipe } from "@/types";

export const getAllElementsByType = async (type: string) => {
  const querySnapshot = await getDocs(collection(db, type));
  return querySnapshot.docs.map((doc) => {
    const elements: Recipe = {
      id: doc.id,
      chefName: doc.data().chefName,
      name: doc.data().name,
      people: doc.data().people,
      preparationTime: doc.data().preparationTime,
      ingredients: doc.data().ingredients,
      steps: doc.data().steps,
      image: doc.data().image,
    };
    return elements;
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
