import { useState } from "react";

interface DropdownProps {
  buttonLabel: string;
  menuItems: string[];
  defaultSelected?: string | null;
  onSelect: (selectedItem: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel,
  menuItems,
  defaultSelected,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(
    defaultSelected || null
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-10">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-white bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {buttonLabel}
        <svg
          className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                    selectedItem === item ? "font-bold" : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
