import { GiMedicines } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container my-20 flex flex-row">
      <div>
        <div className="p-10 text-center md:text-left">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl">
            Your One-Stop Medical Solution
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 ">
            Consult online with our professional doctors, order medical goods
            and have them delivered to your house, can be done in doc.id!
          </p>
        </div>
        <div className="px-10 flex flex-row justify-center items-center gap-20 md:justify-start md:items-start md:gap-10">
          <Link href="/telemedicines">
            <div className="flex flex-col justify-center items-center">
              <FaUserDoctor size={60} />
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Telemedicine
              </p>
            </div>
          </Link>
          <Link href="/products">
            <div className="flex flex-col justify-center items-center">
              <GiMedicines size={60} />
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Shop Wellness Essentials
              </p>
            </div>
          </Link>
        </div>
      </div>
      <img src="hero.svg" className="hidden md:block w-1/2 px-10"></img>
    </div>
  );
};
export default Hero;
