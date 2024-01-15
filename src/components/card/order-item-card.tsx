import { Card, CardContent, CardHeader } from "../ui/card";

const OrderItemCard = ({
  name,
  price,
  qty,
}: {
  name: string;
  price: string;
  qty: number;
}) => {
  return (
    <>
      <Card>
        <CardHeader className="p-2">
          <CardContent className="p-0 flex flex-row justify-start items-center w-full gap-3">
            <img
              src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/671ced60670f98cc3aa7a40e901548a5/detailed"
              className="h-16 w-16 p-1 border-2"
            ></img>
            <div className="flex flex-col justify-start items-start gap-1">
              <p className="text-left">{name}</p>
              <p className="text-zinc-600 leading-none text-xs">$ {price}</p>
              <p className="text-zinc-400 leading-none text-xs">
                Quantity: {qty}
              </p>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default OrderItemCard;
