import React, { useState, useEffect } from "react";
import LogoSideBar from "../logo/logo-sidebar";
import { BiSolidDashboard } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import {
  FaFilePrescription,
  FaChartSimple,
  FaBriefcaseMedical,
} from "react-icons/fa6";
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-8 mt-20">
            <div className="flex gap-8">
              <BiSolidDashboard size={30} />
              <Link href="/admin/" className="text-white text-xl">
                Dashboard
              </Link>
            </div>
            <div className="flex gap-8">
              <FaUsers size={30} />
              <Link href="/admin/users" className="text-white text-xl">
                Manage Users
              </Link>
            </div>

            <div className="flex gap-8">
              <FaBriefcaseMedical size={30} />
              <Link href="/admin/categories" className="text-white text-xl">
                Manage Categories
              </Link>
            </div>

            <div className="flex gap-8">
              <GiMedicines size={30} />
              <Link href="/admin/products" className="text-white text-xl">
                Manage Products
              </Link>
            </div>

            <div className="flex gap-8">
              <FaFilePrescription size={25} />
              <Link href="/admin/orders" className="text-white text-xl">
                Manage Orders
              </Link>
            </div>

            <div className="flex gap-8">
              <FaChartSimple size={30} />
              <Link href="/admin/pharmacy" className="text-white text-xl">
                Manage Pharmacy
              </Link>
            </div>
          </div>
        </div>
      )}

      {!isAsideVisible && (
        <div className="bg-sky-700 h-screen w-20 p-4 ">
          <button
            onClick={() => setIsAsideVisible(true)}
            className="flex justify-center px-2 py-1 mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 448 512"
            >
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AsideBar;
