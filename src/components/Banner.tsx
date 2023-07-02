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
import { SyncLoader } from "react-spinners";

const Banner = () => {
  const { asPath } = useRouter();

  const auth = getAuth(firebaseApp);

  const [user, loading] = useAuthState(auth);

  const handleUserInfo = useMemo(() => {
    if (user) {
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
    } else {
      return (
        <div className="flex md:flex-row flex-col text-lg gap-4">
          <Button Icon={UserIcon} text="Iniciar sesión" href={`/login`} />
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
        <SyncLoader loading={loading} />
        {handleUserInfo}
      </div>
    </div>
  );
};

export default Banner;
