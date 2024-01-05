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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ShippingAddressCard = () => {
  return (
    <>
      <Card className="px-5 pb-5 w-full flex flex-col justify-start items-start gap-3">
        <CardHeader className="p-0 w-full flex flex-row items-center justify-between">
          <h3 className="text-lg">Shipping Address</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sky-700">
                Change Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Address</DialogTitle>
                <DialogDescription>
                  Make changes to your address here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    defaultValue="Street name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    defaultValue="Type notes here"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-0 flex flex-row justify-start items-center gap-10 w-full">
          <img src="Place Holder.svg" className="h-16 w-16 p-0"></img>

          <div className="flex flex-col justify-center items-start">
            <p className="text-zinc-400 leading-none text-xs mt-2">
              Main Address
            </p>
            <p className="text-left">
              Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3, Kuningan
              Tim., Kecamatan Setiabudi, Daerah Khusus Ibukota Jakarta 12950
            </p>

            <p className="text-zinc-600 leading-none text-xs mt-1">
              Notes to driver
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ShippingAddressCard;
