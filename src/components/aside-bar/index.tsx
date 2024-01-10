import React, { useState, useEffect } from "react";
import LogoSideBar from "../logo/logo-sidebar";
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
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                    fill="white"
                  />
                </svg>
              </>
              <Link href="/" className="text-white text-xl">
                Manage Users
              </Link>
            </div>
            <div className="flex gap-8">
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48V256H64V144zM0 144V368c0 61.9 50.1 112 112 112s112-50.1 112-112V189.6c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3 156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3 50.8-47.3 83V144c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3 11.9-71c21.2-15.1 50.5-10.3 66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4 1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z"
                    fill="white"
                  />
                </svg>
              </>
              <Link href="/" className="text-white text-xl">
                Manage Products
              </Link>
            </div>

            <div className="flex gap-8">
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM104 196h72c33.1 0 60 26.9 60 60c0 25.5-15.9 47.2-38.3 55.9l43 40.3 33.8-31c8.1-7.5 20.8-6.9 28.3 1.2s6.9 20.8-1.2 28.3L270 379.7l31.7 29.7c8.1 7.6 8.5 20.2 .9 28.3s-20.2 8.5-28.3 .9l-33.9-31.8-34.9 32c-8.1 7.5-20.8 6.9-28.3-1.2s-6.9-20.8 1.2-28.3l32.6-29.9-64.8-60.8c-.9-.8-1.6-1.7-2.3-2.6H124v44c0 11-9 20-20 20s-20-9-20-20V296 216c0-11 9-20 20-20zm72 80c11 0 20-9 20-20s-9-20-20-20H124v40h52z"
                    fill="white"
                  />
                </svg>
              </>
              <Link href="/" className="text-white text-xl">
                Manage Orders
              </Link>
            </div>

            <div className="flex gap-8">
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
                    fill="white"
                  />
                </svg>
              </>
              <Link href="/" className="text-white text-xl">
                View Reports
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
