import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Ingredient, Recipe } from "@/utils/types";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../firebase/clientApp";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Head from "next/head";
import { errorMessages } from "@/utils/errorMessages";
import { SyncLoader } from "react-spinners";
import { doc, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const UploadPage = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const [user] = useAuthState(auth)

  const [userData] = useDocumentOnce(
    doc(getFirestore(firebaseApp), "users", user?.uid as string)
  );

  const [recipe, setRecipe] = useState<Recipe>({
    chefName: "",
    name: "",
    preparationTime: 0,
    people: 0,
    ingredients: [],
    steps: [],
    imageUrl: "",
  });

  const [ingredient, setIngredient] = useState({ name: "", quantity: 0 });
  const [step, setStep] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRecipe = useCallback(async () => {
    setLoading(true);
    setRecipe({...recipe, chefName: await userData?.data()?.username})
    try {
      await axios.post("/api/recipes", recipe);
      toast.success("¡Receta subida con éxito!");
      router.push("/");
    } catch (error: Error | any) {
      setLoading(false);
      toast.error(errorMessages[error.request.response]);
    }
  }, [recipe]);

  const handleIngredient = useCallback(() => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
    setIngredient({ name: "", quantity: 0 });
  }, [ingredient]);

  const handleStep = useCallback(() => {
    setRecipe({ ...recipe, steps: [...recipe.steps, step] });
    setStep("");
  }, [step]);

  const handleDelete = useCallback(
    (
      item: Ingredient | string,
      array: Array<Ingredient | string>,
      recipeProp: string
    ) => {
      setRecipe({
        ...recipe,
        [recipeProp]: array.filter((i: any) => i !== item),
      });
    },
    [recipe]
  );

  return (
    <>
      <Head>
        <title>Recetario | Subir receta</title>
      </Head>
      <Banner />
      <div className="mx-auto mt-5 mb-16 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[45vw] 3xl:w-[40vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <div className="flex flex-row my-5 text-lg bg-white rounded-3xl shadow-2xl py-16 justify-center">
          <SyncLoader
            loading={loading}
            size={20}
            color="rgb(250 204 21)"
            className="absolute z-[1] self-center"
          />
          <form
            className={`flex flex-col gap-4 mx-auto w-3/4 ${
              loading && "blur-sm"
            }`}
          >
            <h1 className="text-3xl font-bold pb-3">Nueva receta</h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="people">URL de la imagen de la receta</label>
              <input
                disabled={loading}
                className="border border-black rounded-3xl p-2 pl-4 text-lg"
                type="text"
                placeholder="URL de imagen..."
                onChange={(e) =>
                  setRecipe({ ...recipe, imageUrl: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-3 lg:flex-row justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="people">
                  ¿Para cuántas personas es la receta?
                </label>
                <input
                  disabled={loading}
                  className="border border-black rounded-3xl p-2 pl-4 text-lg"
                  type="number"
                  placeholder="Número de personas..."
                  onChange={(e) =>
                    setRecipe({ ...recipe, people: e.target.valueAsNumber })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="people">
                  ¿Cuánto tiempo se tarda en preparar?
                </label>
                <input
                  disabled={loading}
                  className="border border-black rounded-3xl p-2 pl-4 text-lg"
                  type="number"
                  placeholder="Tiempo en minutos..."
                  onChange={(e) =>
                    setRecipe({
                      ...recipe,
                      preparationTime: e.target.valueAsNumber,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nombre de la receta</label>
              <input
                disabled={loading}
                className="border border-black rounded-3xl p-2 pl-4 text-lg"
                type="text"
                placeholder="Escribe el nombre de la receta..."
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="ingredients">Ingredientes de la receta</label>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-2 justify-between content-center"
                  >
                    <li
                      key={index}
                      className="bg-yellow-400 mb-3 rounded-3xl py-1 px-5 w-full"
                    >
                      {ingredient.name} - {ingredient.quantity} unidades
                    </li>
                    <TrashIcon
                      className="text-3xl text-red-600 cursor-pointer"
                      width={30}
                      height={30}
                      onClick={() =>
                        handleDelete(
                          ingredient,
                          recipe.ingredients,
                          "ingredients"
                        )
                      }
                    />
                  </div>
                );
              })}
              <div className="border border-black rounded-3xl p-5 flex flex-col lg:flex-row gap-2">
                <div className="flex flex-col gap-2 lg:w-[80%]">
                  <label>Nombre del ingrediente</label>
                  <input
                    disabled={loading}
                    className="border border-black rounded-3xl p-2 pl-4 text-lg"
                    type="text"
                    name="ingredientName"
                    placeholder="Escribe el nombre..."
                    value={ingredient.name}
                    onChange={(e) =>
                      setIngredient({
                        ...ingredient,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 lg:w-1/6">
                  <label>Cantidad</label>
                  <input
                    disabled={loading}
                    className="border border-black rounded-3xl p-2 pl-4 text-lg"
                    type="number"
                    name="ingredientQuantity"
                    placeholder="Escribe la cantidad..."
                    value={ingredient.quantity}
                    onChange={(e) =>
                      setIngredient({
                        ...ingredient,
                        quantity: e.target.valueAsNumber,
                      })
                    }
                  />
                </div>
                <CheckCircleIcon
                  className="text-3xl text-green-700 cursor-pointer self-end "
                  width={50}
                  height={50}
                  onClick={handleIngredient}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Pasos de la receta</label>
              <ol className="list-decimal list-inside mb-2">
                {recipe.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-2 justify-between content-center"
                  >
                    <li
                      key={index}
                      className="bg-yellow-400 mb-3 rounded-3xl py-1 px-5 w-full"
                    >
                      {step}
                    </li>
                    <TrashIcon
                      className="text-3xl text-red-600 cursor-pointer"
                      width={30}
                      height={30}
                      onClick={() => handleDelete(step, recipe.steps, "steps")}
                    />
                  </div>
                ))}
              </ol>
              <div className="flex flex-row gap-2">
                <textarea
                  disabled={loading}
                  className="border border-black rounded-3xl p-2 pl-4 text-lg w-full"
                  placeholder="Escribe un paso de la receta..."
                  value={step}
                  onChange={(e) => setStep(e.target.value)}
                />
                <CheckCircleIcon
                  className="text-3xl text-green-700 cursor-pointer"
                  width={50}
                  height={50}
                  onClick={handleStep}
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
              type="button"
              onClick={handleRecipe}
            >
              {loading ? "Cargando..." : "Subir receta"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadPage;