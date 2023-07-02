import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const [invalidUserMessaje, setInvalidUserMessaje] = useState("");
  const [invalidUserMessajeVisible, setInvalidUserMessajeVisible] =
    useState(false);


  const handleRegister = async () => {
    setInvalidUserMessajeVisible(false);
    try {
      await axios.post("/api/users", user);
      toast("¡Registro exitoso!")
    } catch (error: Error | any) {
      setInvalidUserMessaje(error.message);
      setInvalidUserMessajeVisible(true);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-1/3 mx-auto">
      {invalidUserMessajeVisible && (
        <span className="text-red-500 text-lg font-semibold">
          {invalidUserMessaje}
        </span>
      )}
      <input
        className="border border-black rounded-3xl p-2 pl-4 text-lg"
        type="text"
        placeholder="Nombre de usuario..."
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        className="border border-black rounded-3xl p-2 pl-4 text-lg"
        type="email"
        placeholder="Correo electrónico..."
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        className="border border-black rounded-3xl p-2 pl-4 text-lg"
        type="password"
        placeholder="Contraseña..."
        autoComplete="new-password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <input
        className="border border-black rounded-3xl p-2 pl-4 text-lg"
        type="date"
        onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
      />
      <button
        className="rounded-3xl text-gray-800 text-lg  font-semibold py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 hover:drop-shadow-lg"
        type="button"
        onClick={handleRegister}
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
