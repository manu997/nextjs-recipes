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

const Login = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);

  useEffect(() => {
    user && router.push("/");
  }, [user]);

  return (
    <>
      <Banner />
      <div className="mx-auto my-5 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[45vw] 3xl:w-[30vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <div className="flex flex-col md:flex-row mb-16 mt-5 md:my-5 gap-8 md:gap-16">
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Login;
