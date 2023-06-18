import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

const NavBar = () => {
  return (
    <div className="bg-yellow-400 2xl:px-96 xl:px-32 lg:px-12 sm:px-20 flex flex-col md:flex-row justify-end h-[5vh]">
      <button
        type="button"
        className="hover:bg-yellow-600 transition duration-150"
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-800 mr-2" />
      </button>
    </div>
  );
};

export default NavBar;
