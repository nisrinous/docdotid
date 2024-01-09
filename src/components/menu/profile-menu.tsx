import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";
import { Button } from "../ui/button";

const ProfileMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setToken(""));
  };

  return (
    <>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger className="pt-2">
            <FaRegUserCircle size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-7">
            <DropdownMenuItem className="w-36">
              <Link href="/">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/products">Purchase History</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/" className="font-semibold">
                <Button
                  variant="link"
                  className="p-0 m-0"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
export default ProfileMenu;
