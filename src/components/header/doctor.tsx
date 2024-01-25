import Logo from "@/components/logo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DoctorProfileMenu from "../menu/doctor-profile-menu";

const DoctorHeader = () => {
  const { token } = useSelector((state: RootState) => state.user);
  return (
    <header className="bg-white sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between md:hidden">
        <Logo />
        <div className="flex flex-row justify-center items-center gap-5">
          {token && <DoctorProfileMenu />}
        </div>
      </div>
      <div className="container h-16 justify-between items-center hidden md:flex">
        <Logo />
        {token && (
          <div className="flex flex-row justify-center items-center gap-5">
            <DoctorProfileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default DoctorHeader;
