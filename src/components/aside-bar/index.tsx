import React, { useState, useEffect } from "react";

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
    <div>
      {isAsideVisible && (
        <div className="fixed h-screen bg-sky-700 text-white p-4 w-64 transition-width duration-300 ease-in-out">
          <p>Admin Panel Content</p>
        </div>
      )}

      {!isAsideVisible && (
        <button
          onClick={() => setIsAsideMobileVisible(true)}
          className="fixed bg-gray-600 text-white px-2 py-1 mt-4"
        >
          Show
        </button>
      )}

      {isAsideMobileVisible && (
        <div className="fixed h-screen bg-sky-700 text-white p-4 w-64 transition-width duration-300 ease-in-out">
          <p>Admin Panel Content</p>
          <button
            onClick={() => setIsAsideMobileVisible(false)}
            className="fixed bg-gray-600 text-white px-2 py-1 mt-4"
          >
            Show
          </button>
        </div>
      )}
    </div>
  );
};

export default AsideBar;
