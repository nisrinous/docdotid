import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const ShippingAddressCard = () => {
  const [displayAddNewAddress, setDisplayAddNewAddress] =
    useState<boolean>(false);
  return (
    <>
      <Card className="px-5 pb-5 w-full flex flex-col justify-start items-start">
        <CardHeader className="p-0 w-full flex flex-row items-center justify-between">
          <h3 className="text-lg">Shipping Address</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sky-700">
                Change Address
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Address</DialogTitle>
                <DialogDescription>
                  Make changes to your address here, click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <Select>
                <SelectTrigger className="h-28">
                  <SelectValue placeholder="Select a shipping address" />
                </SelectTrigger>
                <SelectContent className="w-[374px] m-0 p-0 items-center justify-center">
                  <SelectItem value="Main Address" className="p-2">
                    <div className="flex flex-col justify-center items-start">
                      <p className="text-zinc-400 leading-none text-xs mb-2">
                        Main Address
                      </p>
                      <p className="text-left">
                        Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3,
                        Kuningan Tim., Kecamatan Setiabudi, Daerah Khusus
                        Ibukota Jakarta 12950
                      </p>

                      <p className="text-zinc-600 leading-none text-xs mt-1">
                        Notes to driver
                      </p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Address2" className="p-2">
                    <div className="flex flex-col justify-center items-start">
                      <p className="text-left">
                        Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3,
                        Kuningan Tim., Kecamatan Setiabudi, Daerah Khusus
                        Ibukota Jakarta 12950
                      </p>

                      <p className="text-zinc-600 leading-none text-xs mt-1">
                        Notes to driver
                      </p>
                    </div>
                  </SelectItem>
                  <SelectItem value="Address3" className="p-2">
                    <div className="flex flex-col justify-center items-start">
                      <p className="text-left">
                        Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3,
                        Kuningan Tim., Kecamatan Setiabudi, Daerah Khusus
                        Ibukota Jakarta 12950
                      </p>

                      <p className="text-zinc-600 leading-none text-xs mt-1">
                        Notes to driver
                      </p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {!displayAddNewAddress && (
                <div className="flex flex-col justify-end items-end">
                  <Button
                    variant="link"
                    className="px-0 text-sky-700"
                    onClick={() => setDisplayAddNewAddress(true)}
                  >
                    Or add new address
                  </Button>
                </div>
              )}
              {displayAddNewAddress && (
                <div className="flex flex-col my-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="addressname" className="text-left">
                      New Address
                    </Label>
                    <Textarea id="addressname" className="col-span-3" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-left mt-2">
                      Notes
                    </Label>
                    <Input id="notes" className="col-span-3" />
                  </div>
                  <div>
                    <Button type="submit" className="my-3 justify-end">
                      Add address
                    </Button>
                  </div>
                </div>
              )}
              <DialogFooter>
                <DialogClose>
                  <Button
                    type="submit"
                    className="mt-10"
                    onClick={() => setDisplayAddNewAddress(false)}
                  >
                    Save changes
                  </Button>
                </DialogClose>
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
