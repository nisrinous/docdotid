import { Button } from "@/components/ui/button";

export default function ProductDetails() {
  return (
    <>
      <div className="container my-10 grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 md:gap-10 px-20 lg:px-40">
        <div className="col-span-1 md:col-span-1">
          <img
            src="https://onecms-res.cloudinary.com/image/upload/s--uXpdFlVW--/c_crop,h_428,w_762,x_0,y_18/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_one-cms:core:watermark:afp_watermark,w_0.1/f_auto,q_auto/v1/one-cms/core/f3db88d3f76cf546544eca7199920c659d767953.jpg?itok=Ex2eUOsi"
            className="border-[1px] p-5"
          ></img>
        </div>

        <div className="col-span-1 md:col-span-2 mt-10 md:mt-0">
          <h3 className="font-semibold text-2xl md:text-3xl border-b-2 mt-1 mb-3 pb-3 text-center md:text-left">
            Product Name
          </h3>
          <div className="flex flex-col gap-1 justify-center items-center md:justify-start md:items-start">
            <h5 className="font-medium text-xl md:text-2xl text-center md:text-left text-orange-500">
              $ 89.9
            </h5>
            <p className="text-zinc-600 leading-none text-base">XX pcs/pack</p>
            <Button className="w-32 my-2">Add to cart</Button>
          </div>
          <p className="text-zinc-500 leading-none text-base mt-6">
            Product description
          </p>

          <div className="flex flex-col mt-5">
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
        </div>
      </div>
    </>
  );
}
