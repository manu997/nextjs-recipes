import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Recipe } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../../firebase/clientApp";

const UploadPage = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), (user) => {
      if (user === null) {
        router.push("/");
      }
    });
  }, []);

  const [recipe, setRecipe] = useState<Recipe>({
    chefName: "",
    name: "",
    preparationTime: 0,
    people: 0,
    ingredients: [],
    steps: [],
    image: "",
  });

  const [ingredient, setIngredient] = useState({ name: "", quantity: 0 });
  const [step, setStep] = useState("");
  const [counterSteps, setCounterSteps] = useState(0);

  const [invalidUserMessaje, setInvalidUserMessaje] = useState("");
  const [invalidUserMessajeVisible, setInvalidUserMessajeVisible] =
    useState(false);

  const handleRecipe = useCallback(async () => {
    setInvalidUserMessajeVisible(false);
    try {
      await axios.post("/api/recipes", recipe);
      toast("¡Receta subida con éxito!");
      router.push("/");
    } catch (error: Error | any) {
      setInvalidUserMessaje(error.message);
      setInvalidUserMessajeVisible(true);
    }
  }, []);

  const handleIngredient = useCallback(() => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
    setIngredient({ name: "", quantity: 0 });
  }, [ingredient]);

  const handleStep = useCallback(() => {
    setRecipe({ ...recipe, steps: [...recipe.steps, step] });
    setStep("");
    setCounterSteps((prev) => prev + 1);
  }, [step]);

  const displaySteps = useMemo(() => {
    return recipe.steps.map((step, index) => (
      <div className="flex flex-col gap-2" key={index}>
        <ul>Paso {counterSteps}: </ul>
        <p>{step}</p>
      </div>
    ));
  }, [counterSteps, recipe.steps]);

  return (
    <>
      <Banner />
      <div className="mx-auto my-5 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[45vw] 3xl:w-[40vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <div className="flex flex-row my-5 text-lg">
          <form className="flex flex-col gap-4 mx-auto w-3/4">
            {invalidUserMessajeVisible && (
              <span className="text-red-500 text-lg font-semibold">
                {invalidUserMessaje}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="people">URL de la imagen de la receta</label>
              <input
                className="border border-black rounded-3xl p-2 pl-4 text-lg"
                type="text"
                placeholder="URL de imagen..."
                onChange={(e) =>
                  setRecipe({ ...recipe, image: e.target.value })
                }
              />
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="people">
                  ¿Para cuántas personas es la receta?
                </label>
                <input
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
                className="border border-black rounded-3xl p-2 pl-4 text-lg"
                type="text"
                placeholder="Escribe el nombre de la receta..."
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="ingredients">Ingredientes de la receta</label>
              <div className=" border border-black rounded-3xl p-5">
                <table className="table-fixed">
                  <thead className="text-left">
                    <tr className="ml-5">
                      <th>Nombre del ingrediente</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.ingredients.map((ingredient, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span>{ingredient.name}</span>
                          </td>
                          <td>
                            <span>{ingredient.quantity}</span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="w-4/5">
                        <input
                          className="border w-[95%] border-black rounded-3xl p-2 pl-4 text-lg"
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
                      </td>
                      <td>
                        <input
                          className="border border-black rounded-3xl p-2 pl-4 text-lg"
                          type="number"
                          name="ingredientName"
                          placeholder="Escribe la cantidad..."
                          value={ingredient.quantity}
                          onChange={(e) =>
                            setIngredient({
                              ...ingredient,
                              quantity: e.target.valueAsNumber,
                            })
                          }
                        />
                      </td>
                      <td>
                        <CheckCircleIcon
                          className="text-3xl text-green-700 cursor-pointer"
                          width={50}
                          height={50}
                          onClick={handleIngredient}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Pasos de la receta</label>
              {displaySteps}
              <div className="flex flex-row gap-2">
                <textarea
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
              className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
              type="button"
              onClick={handleRecipe}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
