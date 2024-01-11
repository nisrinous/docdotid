import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

const PurchasedCard = ({ type, id }: { type: string; id: number }) => {
  return (
    <>
      <Card className="px-5 pt-2 pb-3 w-full flex flex-col justify-start items-start">
        <CardHeader className="px-2 py-0 w-full flex flex-row items-center justify-between">
          <h3 className="text-lg">{type}order</h3>
          <Badge className="bg-gray-400 px-4 py-1 hover:bg-gray-400 hover:cursor-default">
            Order status
          </Badge>
        </CardHeader>
        <CardContent className="p-2 w-full flex flex-row gap-5 md:gap-10 justify-between">
          <div className="flex flex-row gap-10">
            <div className="flex flex-row justify-center items-center gap-3">
              <img src="Caduceus.svg" className="border-2 p-1"></img>
              <div className="gap-0">
                <p className="leading-none text-sm ">Product Name</p>
                <p className="text-zinc-500 leading-none text-sm ">
                  + x other product
                </p>
              </div>
            </div>
            <div className="flex-col justify-center gap-0 hidden md:flex">
              <p className="text-zinc-600 leading-none text-sm ">Created at</p>
              <p className="leading-none text-sm ">Mon, 13th Dec 2023</p>
            </div>
            <div className="flex-col justify-center gap-0 hidden md:flex">
              <p className="text-zinc-600 leading-none text-sm ">Total price</p>
              <p className="leading-none text-sm  text-orange-600">$ total</p>
            </div>
          </div>

          <div>
            <Button variant="link" className="text-sky-700">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PurchasedCard;