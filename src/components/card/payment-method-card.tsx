import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PaymentMethodCard = ({ method }: { method: string }) => {
  return (
    <div className="px-10">
      <h5 className="py-2">{method}</h5>

      <Dialog>
        <DialogTrigger asChild>
          <CardHeader className="flex flex-row items-center p-1 w-full">
            <Button
              variant="outline"
              className="text-base justify-start items-center py-0 w-full"
            >
              {method}
            </Button>
          </CardHeader>
        </DialogTrigger>
        <DialogContent className="w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay with {method}?</DialogTitle>
            <DialogDescription>
              Make sure the order and payment method chosen are appropriate.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button type="submit" className="mt-10">
                Pay with {method}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethodCard;
