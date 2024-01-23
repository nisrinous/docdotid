import { RiHospitalFill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import {
  FaUsers,
  FaBriefcaseMedical,
  FaFilePrescription,
} from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";

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

  { name: "Dashboard", link: "/pharmacyadm", icon: BiSolidDashboard },
  {
    name: "Manage Pharmacy",
    link: "/pharmacyadm/pharmacy",
    icon: RiHospitalFill,
    margin: true,
  },
  {
    name: "Manage Product Categories",
    link: "/pharmacyadm/categories",
    icon: FaBriefcaseMedical,
    margin: true,
  },
  {
    name: "Manage Products",
    link: "/pharmacyadm/products",
    icon: GiMedicines,
    margin: true,
  },
  {
    name: "Manage Product Inventory",
    link: "/pharmacyadm/inventory",
    icon: RiHospitalFill,
    margin: true,
  },
  {
    name: "Manage Stock Mutation",
    link: "/pharmacyadm/stock",
    icon: RiHospitalFill,
    margin: true,
  },
  {
    name: "Manage Orders",
    link: "/pharmacyadm/orders",
    icon: FaFilePrescription,
    margin: true,
  },
];
