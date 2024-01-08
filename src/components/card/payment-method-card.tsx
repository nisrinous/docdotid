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
import Link from "next/link";

const PaymentMethodCard = ({
  method,
  img_path,
}: {
  method: string;
  img_path?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="mb-2 p-1">
          <CardHeader className="flex flex-row items-center p-1 w-full gap-1">
            <img src={img_path} className="mt-1 max-w-16 max-h-8 px-1"></img>
            <Button
              variant="link"
              className="text-base justify-start items-center py-0 w-full"
            >
              {method}
            </Button>
          </CardHeader>
        </Card>
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
            <Link href="/checkout/payment">
              <Button type="submit" className="mt-10">
                Pay with {method}
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodCard;
