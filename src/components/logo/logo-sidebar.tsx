import Link from "next/link";
import { IconContext } from "react-icons";
import { FaCircle } from "react-icons/fa";

const LogoSideBar = () => {
  return (
    <>
      <Link
        href="/"
        className="flex flex-row justify-center items-center gap-[1px] font-semibold text-2xl"
      >
        <div>doc</div>
        <IconContext.Provider value={{ color: "#5CCCE5" }}>
          <FaCircle size={30} />
        </IconContext.Provider>
        <div>id</div>
      </Link>
    </>
  );
};

export default LogoSideBar;
