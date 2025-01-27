import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ManageQuantityButton from "../button/manage-quantity-button";
import { CartItemResponse } from "@/types";

const CartItemCard = ({ item }: { item: CartItemResponse }) => {
  return (
    <>
      <CardContent className="p-0 pb-3 flex flex-row justify-start items-center w-full">
        <img
          src="https://imgur.com/o3VPiNq.png"
          className="h-16 w-16 p-1 border-2"
        ></img>
        <div className="flex flex-col gap-2 md:flex-row justify-around items-center w-full">
          <div className="flex flex-col justify-start items-start md:justify-center md:items-start">
            <p className="text-left">{item.product.name}</p>
            <p className="text-zinc-600 leading-none text-xs">{item.price}</p>
            <p className="text-green-700">{item.stock}</p>
          </div>
          <div className="flex flex-col justify-start items-start p-0">
            <ManageQuantityButton quantity={item.quantity} />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              disabled={item.quantity < 1}
              className="text-sky-700 p-0"
            >
              {item.quantity > 1 ? "Delete Item" : null}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Item</DialogTitle>
              <DialogDescription>
                Are you sure to delete {}? This action can not be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
};

export default CartItemCard;
