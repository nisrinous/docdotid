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

const CartItemCard = ({ quantity }: { quantity: number }) => {
  return (
    <>
      <CardContent className="p-0 py-2 flex flex-row justify-start items-center w-full border-b-2 mb-3">
        <img src="Caduceus.svg" className="h-16 w-16 p-1 border-2"></img>
        <div className="flex flex-col gap-2 md:flex-row justify-around items-center w-full">
          <div className="flex flex-col justify-start items-start md:justify-center md:items-start">
            <p className="text-zinc-400 leading-none text-xs">Category</p>
            <p className="text-left">Product Name</p>
            <p className="text-zinc-600 leading-none text-xs">Product Price</p>
            <p className="text-green-700">on stock</p>
          </div>
          <div className="flex flex-col justify-start items-start p-0">
            <ManageQuantityButton quantity={quantity} />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              disabled={quantity < 1}
              className="text-sky-700 p-0"
            >
              {quantity > 1 ? "Delete Item" : "Cari p lain"}
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
