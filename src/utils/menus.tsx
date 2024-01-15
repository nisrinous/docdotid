import { RiHospitalFill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import {
  FaUsers,
  FaBriefcaseMedical,
  FaFilePrescription,
} from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";

export const menus = [
  { name: "Dashboard", link: "/admin", icon: BiSolidDashboard },
  {
    name: "Manage Users",
    link: "/admin/users",
    icon: FaUsers,
    margin: true,
  },
  {
    name: "Manage Categories",
    link: "/admin/categories",
    icon: FaBriefcaseMedical,
    margin: true,
  },
  {
    name: "Manage Products",
    link: "/admin/products",
    icon: GiMedicines,
    margin: true,
  },
  {
    name: "Manage Orders",
    link: "/admin/orders",
    icon: FaFilePrescription,
    margin: true,
  },
  {
    name: "Manage Pharmacy",
    link: "/admin/pharmacy",
    icon: RiHospitalFill,
    margin: true,
  },
  {
    name: "Log Out",
    link: "/admin/pharmacies",
    icon: IoLogOut,
    margin: true,
  },
];

export function handleLogout() {}
