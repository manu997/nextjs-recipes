import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { errorMessages } from "@/utils/errorMessages";
import { SyncLoader } from "react-spinners";
import { GoogleLoginButton } from "react-social-login-buttons";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const auth = getAuth(firebaseApp);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleLogin = async () => {
    const login = await signInWithEmailAndPassword(email, password);
    login?.user !== undefined
      ? router.push("/")
      : toast.error(errorMessages[error?.code as string]);
  };

  return (
    <div className="w-full flex justify-center h-max">
      <SyncLoader
        loading={loading}
        size={20}
        color="rgb(250 204 21)"
        className="absolute z-[1] self-center"
      />
      <form
        className={`flex flex-col gap-4 w-1/3 mx-auto text-lg ${
          loading && "blur-sm"
        } w-full`}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Correo electrónico</label>
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="email"
            placeholder="Correo electrónico..."
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Contraseña</label>
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="password"
            placeholder="Contraseña..."
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
        <GoogleLoginButton
          onClick={() => signInWithGoogle()}
          style={{ "border-radius": "999px", "box-shadow": "none", "border": "1px solid black", "padding-left": "1rem" }}
          text="Iniciar sesión con Google"
        />
      </form>
    </div>
  );
};

export default LoginForm;
