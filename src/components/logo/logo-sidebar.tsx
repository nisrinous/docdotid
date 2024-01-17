import Link from "next/link";
import { IconContext } from "react-icons";
import { FaCircle } from "react-icons/fa";

const LogoSideBar = () => {
  return (
    <>
      <Link href="/" className="flex flex-row  gap-[1px] font-semibold text-xl">
        <div>doc</div>
        <IconContext.Provider value={{ color: "#5CCCE5" }}>
          <FaCircle size={25} />
        </IconContext.Provider>
        <div>id</div>
      </Link>
    </>
  );
};

export default LogoSideBar;
