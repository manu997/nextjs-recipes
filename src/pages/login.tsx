import Banner from "@/components/Banner";
import Button from "@/components/Button";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Login = () => {
  return (
    <>
      <Banner />
      <div className="mx-auto my-5 w-[90vw] md:w-[70vw] lg:w-[55vw] xl:w-[45vw] 3xl:w-[30vw]">
        <Button Icon={ArrowLeftIcon} text="Ir a inicio" href={`/`} />
        <div className="flex flex-row my-5">
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Login;
