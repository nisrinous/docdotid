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
          <Link href="/telemedicine">
            <div className="flex flex-col justify-center items-center">
              <img src="https://i.imgur.com/Bfdrk2m.png" className="h-20"></img>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Telemedicine
              </p>
            </div>
          </Link>
          <Link href="/product">
            <div className="flex flex-col justify-center items-center">
              <img src="https://i.imgur.com/WA3Vrlf.png" className="h-20"></img>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Shop Wellness Essentials
              </p>
            </div>
          </Link>
        </div>
      </div>
      <img
        src="https://i.imgur.com/XU152ou.png"
        className="hidden md:block w-1/2 px-10"
      ></img>
    </div>
  );
};
export default Hero;
