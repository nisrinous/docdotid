import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/store/slices/authSlice";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import deleteCookies from "../delete-cookies";

const ProfileMenu = () => {
  const { email } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteCookies();
    dispatch(deleteUser());
  };

  return (
    <>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger className="pt-2">
            <FaRegUserCircle size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-7">
            <DropdownMenuItem className="w-full">
              <p className="text-zinc-500 leading-none text-sm mt-1">{email}</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/user/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/purchasehistory">Purchase History</Link>
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
