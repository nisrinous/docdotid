import React, { useState, useEffect } from "react";
import LogoSideBar from "../logo/logo-sidebar";
import { BiSolidDashboard } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogOut } from "react-icons/io5";
import { RiHospitalFill } from "react-icons/ri";
import { FaFilePrescription, FaBriefcaseMedical } from "react-icons/fa6";
import Link from "next/link";

const AsideBar: React.FC = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [isAsideMobileVisible, setIsAsideMobileVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth > 1000) {
        setIsAsideVisible(true);
        setIsAsideMobileVisible(false);
      } else {
        setIsAsideVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-1/5">
      {isAsideVisible && (
        <div className=" h-screen bg-sky-700 text-white p-4 transition-width duration-300 ease-in-out">
          <div className="flex justify-between">
            <LogoSideBar />
            <div>
              <button
                onClick={() => setIsAsideVisible(false)}
                className="  text-white px-2 py-1 mt-4 "
              >
                <RxHamburgerMenu size={20} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-8 mt-20">
            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <BiSolidDashboard size={30} />
              <Link href="/admin/" className="text-white text-lg">
                Dashboard
              </Link>
            </div>
            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <FaUsers size={30} />
              <Link href="/admin/users" className="text-white text-lg">
                Manage Users
              </Link>
            </div>

            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <FaBriefcaseMedical size={30} />
              <Link href="/admin/categories" className="text-white text-lg">
                Manage Categories
              </Link>
            </div>

            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <GiMedicines size={30} />
              <Link href="/admin/products" className="text-white text-lg">
                Manage Products
              </Link>
            </div>

            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <FaFilePrescription size={25} />
              <Link href="/admin/orders" className="text-white text-lg">
                Manage Orders
              </Link>
            </div>

            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <RiHospitalFill size={30} />
              <Link href="/admin/pharmacy" className="text-white text-lg">
                Manage Pharmacy
              </Link>
            </div>

            <div className="flex gap-8 rounded-md px-2 py-2 hover:bg-[#5CCCE5]">
              <IoLogOut size={30} />
              <Link href="/" className="text-white text-lg">
                Log Out
              </Link>
            </div>
          </div>
        </div>
      )}

      {!isAsideVisible && (
        <div className="bg-sky-700 h-screen w-20 p-4 ">
          <button
            onClick={() => setIsAsideVisible(true)}
            className="flex justify-center px-2 py-1 mt-4 text-white"
          >
            <RxHamburgerMenu size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AsideBar;
