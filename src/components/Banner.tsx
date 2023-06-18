import { PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

const Banner = () => {
  return (
    <div className="bg-yellow-400 2xl:px-96 xl:px-32 lg:px-12 sm:px-20 p-10 flex flex-col md:flex-row justify-around">
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl leading text-gray-700 font-bold xs:mx-20">
          Descubre Recetario,<br></br> la forma más fácil de comer variado
        </h1>
        <h3 className="text-[1.5em] text-gray-700 font-semibold my-5">
          Comparte y encuentra tus recetas favoritas y las de miles de usuarios
        </h3>
        <div className="flex md:flex-row flex-col text-lg gap-4">
          <Button Icon={PlusIcon} text="Subir receta" />
          <Button Icon={UserIcon} text="Iniciar sesión" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
