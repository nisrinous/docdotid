import React, { FC, useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import LogoSideBar from "../logo/logo-sidebar";
import { useRouter } from "next/router";
import { LuUserCircle2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUserDetail } from "@/lib/fetcher/profile";

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
  const { role_id, token } = useSelector((state: RootState) => state.user);

  const [open, setOpen] = useState(true);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleRole = (role_id: number) => {
    return role_id === 1 ? "Admin" : "Admin Pharmacy";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetail(token);
        setUserName(data.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();

    setRole(handleRole(role_id));

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
  }, [token, role_id]);

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
            <div className="flex flex-row w-full gap-2">
              <div>
                <h1 className="text-2xl mt-5 font-bold">{`Welcome, ${
                  userName || "User"
                }`}</h1>
                <h3 className="rounded-lg bg-[#064789] px-2 py-1 flex gap-2 my-auto font-bold w-fit">
                  {" "}
                  <LuUserCircle2 size={25} /> {role}
                </h3>
              </div>
            </div>
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
              } absolute left-48 bg-sky-600 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit group-hover:z-10 `}
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
