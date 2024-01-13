import React, { FC, useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import LogoSideBar from "../logo/logo-sidebar";
import { useRouter } from "next/router";

interface MenuItem {
  name: string;
  link: string;
  icon: React.ComponentType<{ size: string }>;
  margin?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  menus: MenuItem[];
}

const Sidebar: FC<SidebarProps> = ({ menus }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setOpen(false);
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setOpen(newScreenWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`bg-sky-600 min-h-screen ${
        open ? "w-96" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end text-white">
        <>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={handleToggle}
          />
        </>
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {open && (
          <div className="mb-5">
            <LogoSideBar />
          </div>
        )}
        {menus.map((menu, i) => (
          <Link
            href={menu.link}
            onClick={menu.onClick}
            key={i}
            className={`group flex items-center text-md font-medium p-1 text-white hover:bg-gray-800 hover:text-white rounded-md  focus:bg-gray-800 focus:text-white  ${
              menu.link === currentPath ? "bg-gray-800" : ""
            }`}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2
              className={` hover:text-white ml-5 whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-[#79AB9C] font-semibold whitespace-pre text-black rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit group-hover:z-10 `}
            >
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
