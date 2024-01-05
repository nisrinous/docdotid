import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      <Card className="px-5 pb-5 w-full flex flex-col justify-start items-start gap-3">
        <CardHeader className="p-0 w-full flex flex-row items-center justify-between border-b-2 ">
          <h3 className="text-lg px-4">Pharmacy Name</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sky-700 m-0">
                Delete Item
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
        </CardHeader>
        <CardContent className="py-0 px-4 flex flex-row justify-start items-center gap-10 w-full">
          <img src="Caduceus.svg" className="h-16 w-16 p-1 border-2"></img>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col justify-center items-start">
              <p className="text-zinc-400 leading-none text-xs">Category</p>
              <p className="text-left">Product Name</p>
              <p className="text-zinc-600 leading-none text-xs mt-1">
                Product Price
              </p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <ManageQuantityButton counter={quantity} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CartItemCard;
