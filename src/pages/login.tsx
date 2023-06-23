import Banner from "@/components/Banner";
import Button from "@/components/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [badLoginMessaje, setBadLoginMessaje] = useState(false);

  const handleLogin = async () => {
    setBadLoginMessaje(false);
    try {
      const login = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      console.log(login.data);
    } catch (error: Error | any) {
      setBadLoginMessaje(true);
    }
  };

  return (
    <>
      <Banner />
      <div className="mx-auto my-5 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[45vw] 3xl:w-[30vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <form className="flex flex-col gap-4 w-1/3 mx-auto">
          {badLoginMessaje && (
            <span className="text-red-500 text-lg font-semibold">
              El email y/o la contreseeña son incorrectos
            </span>
          )}
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="email"
            name="email"
            placeholder="Correo electrónico..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="password"
            name="password"
            placeholder="Contraseña..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
            type="button"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
