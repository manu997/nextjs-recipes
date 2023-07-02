import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase/clientApp";
import { errorMessages } from "../utils/errorMessages";
import { SyncLoader } from "react-spinners";

const RegisterForm = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);

  const auth = getAuth(firebaseApp);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users", newUser);
      toast.success("¡Registro exitoso!");
    } catch (error: Error | any) {
      setLoading(false);
      toast.error(errorMessages[error.request.response]);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <SyncLoader
        loading={loading}
        size={20}
        color="rgb(250 204 21)"
        className="absolute z-[1] self-center"
      />
      <form
        className={`flex flex-col gap-4 w-1/3 mx-auto ${
          loading && "blur-sm"
        } text-lg w-full`}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Nombre de usuario*</label>
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="text"
            placeholder="Nombre de usuario..."
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Correo electrónico*</label>
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="email"
            placeholder="Correo electrónico..."
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Contraseña*</label>
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="password"
            placeholder="Contraseña..."
            autoComplete="new-password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Fecha de nacimiento*</label>
          <input
            className="border border-black rounded-3xl p-2 pl-4 text-lg"
            type="date"
            onChange={(e) =>
              setNewUser({ ...newUser, birthDate: e.target.value })
            }
            disabled={loading}
          />
        </div>
        <button
          className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
          type="button"
          onClick={handleRegister}
          disabled={loading}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
