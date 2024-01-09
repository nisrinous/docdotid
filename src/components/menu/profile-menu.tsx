import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";

const ProfileMenu = () => {
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
              <Link href="/auth/login" className="font-semibold">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
export default ProfileMenu;
