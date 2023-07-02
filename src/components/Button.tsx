import { ButtonProps } from "@/types";
import Link from "next/link";

const Button = ({ Icon, text, href, onclick, hidden }: ButtonProps) => {
  return (
    <Link href={href} hidden={hidden}>
      <button
        onClick={onclick}
        type="button"
        className="h-full py-2 px-4 bg-yellow-300 border border-gray-800 transition duration-300 hover:bg-yellow-500 md:w-50 text-gray-800 text-lg flex flex-row justify-center items-center rounded-full font-semibold"
      >
        <span className="h-6 w-6 text-gray-800 mr-2">
          <Icon />
        </span>
        {text}
      </button>
    </Link>
  );
};

export default Button;
