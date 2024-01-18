import { Button } from "@/components/ui/button";

export default function StartChat() {
  return (
    <>
      <div className="container my-10 flex flex-col justify-center items-center lg:px-20">
        <div className="">
          <img
            src="https://onecms-res.cloudinary.com/image/upload/s--uXpdFlVW--/c_crop,h_428,w_762,x_0,y_18/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_one-cms:core:watermark:afp_watermark,w_0.1/f_auto,q_auto/v1/one-cms/core/f3db88d3f76cf546544eca7199920c659d767953.jpg?itok=Ex2eUOsi"
            className="max-w-sm"
          ></img>
          <div className="my-3">
            <h3 className="font-semibold text-2xl md:text-3xl text-left leading-none">
              Doctor Name
            </h3>
            <p className="text-zinc-600 leading-none text-base border-b-2 pb-2 text-left">
              Specialisasi
            </p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h5 className="font-medium text-xl md:text-2xl text-left text-orange-500 bg-slate-100 w-full">
              $ 19.8
            </h5>
          </div>
          <p className="text-zinc-500 leading-none text-base mt-6">
            Product description
          </p>

          <div className="flex flex-col mt-5 items-center">
            <h5 className="font-medium text-base">Generic name</h5>
            <p className="text-zinc-500 leading-none text-sm">Generic names</p>
          </div>
          <div className="flex flex-col mt-5">
            <h5 className="font-medium text-base">Category</h5>
            <p className="text-zinc-500 leading-none text-sm">Category XXX</p>
          </div>
          <div className="flex flex-col mt-5">
            <h5 className="font-medium text-base">Manufacturer</h5>
            <p className="text-zinc-500 leading-none text-sm">Pharmacy XXX</p>
          </div>
          <Button className="w-full my-10">Continue to chat</Button>
        </div>
      </div>
    </>
  );
}
