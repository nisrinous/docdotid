import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const HeroDoctor = () => {
  return (
    <div className="container mt-5">
      <Card className="hidden my-10 md:flex flex-row justify-evenly items-center ">
        <div className="text-center md:text-left">
          <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight md:text-2xl mt-1">
            Welcome,
          </h2>
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl text-[#5CCCE5]">
            Dr. Tazki Catur
          </h1>
          <p className="leading-loose text-gray-500 ">
            Have a great day at work
          </p>
          <div className="flex items-center space-x-2 gap-1 my-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Online</Label>
          </div>
        </div>
        <img src="hero-doctor.svg" className="w-1/4 px-5"></img>
      </Card>
      <div className="p-5">
        <Card className="container flex md:hidden flex-col justify-center items-center max-w-sm p-3">
          <img src="hero-doctor.svg" className="px-5 w-2/3"></img>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
              Welcome,
            </h2>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl text-[#5CCCE5]">
              Dr. Tazki Catur
            </h1>
            <p className="leading-loose text-gray-500 ">
              Have a great day at work
            </p>
            <div className="flex flex-row justify-center items-center space-x-2 gap-1 my-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Online</Label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default HeroDoctor;
