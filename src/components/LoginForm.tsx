import { useCallback, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase/clientApp";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [invalidUserMessaje, setInvalidUserMessaje] = useState<
    string | undefined
  >("");

  const auth = getAuth(firebaseApp);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    const login = await signInWithEmailAndPassword(email, password);
    login?.user !== undefined ? router.push("/") : setInvalidUserMessaje("Email y/o contraseña incorrectos.")
  };

  return (
    <form className="flex flex-col gap-4 w-1/3 mx-auto">
      {error && (
        <span className="text-red-500 text-lg font-semibold">
          {invalidUserMessaje}
        </span>
      )}
      <input
        className="border border-black rounded-3xl p-2 pl-4 text-lg"
        type="email"
        placeholder="Correo electrónico..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-black rounded-3xl p-2 pl-4 text-lg"
        type="password"
        placeholder="Contraseña..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
        type="button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
