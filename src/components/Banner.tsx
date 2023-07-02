import {
  ArrowLeftOnRectangleIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Banner = () => {
  const { asPath } = useRouter();

  const auth = getAuth(firebaseApp);

  const [user, loading] = useAuthState(auth);

  const handleUserInfo = useMemo(() => {
    if (loading) {
      return (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (!user) {
      return (
        <div className="flex md:flex-row flex-col text-lg gap-4">
          <Button Icon={UserIcon} text="Iniciar sesión" href={`/login`} />
        </div>
      );
    } else {
      return (
        <div className="flex md:flex-row flex-col text-lg gap-4">
          <Button
            Icon={PlusIcon}
            text="Subir una receta"
            href={`/recipe/upload`}
            hidden={asPath === "/recipe/upload"}
          />
          <Button
            Icon={UserIcon}
            text="Mi perfil"
            href={`/user/${user?.uid}`}
          />
          <Button
            Icon={ArrowLeftOnRectangleIcon}
            text="Cerrar sesión"
            onclick={() => auth.signOut()}
            href={"/"}
          />
        </div>
      );
    }
  }, [user, loading]);

  return (
    <div className="bg-yellow-400 2xl:px-96 xl:px-72 lg:px-28 sm:px-20 p-10 flex flex-col md:flex-row justify-around">
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl leading text-gray-700 font-bold xs:mx-20">
          Descubre Recetario,<br></br> la forma más fácil de comer variado
        </h1>
        <h3 className="text-[1.5em] text-gray-700 font-semibold my-5">
          Comparte y encuentra tus recetas favoritas y las de miles de usuarios
        </h3>
        {handleUserInfo}
      </div>
    </div>
  );
};

export default Banner;
