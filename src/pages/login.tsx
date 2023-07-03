import Banner from "@/components/Banner";
import Button from "@/components/Button";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

  useEffect(() => {
    user && router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Recetario | Indentificarse</title>
      </Head>
      <Banner />
      <div className="mx-auto my-5 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[48vw] 3xl:w-[35vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <div className="flex flex-col mb-16 mt-5 md:my-5 gap-5 bg-white rounded-3xl p-8 md:p-16 shadow-2xl">
          <h2 className="text-3xl font-bold pb-3">Inicia sesión o regístrate</h2>
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
