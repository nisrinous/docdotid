import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function MyCart() {
  return (
    <>
      <div className="container my-10 grid grid-cols-3 grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">My Cart</h3>
            <div className="flex items-center space-x-2 ">
              <Checkbox id="terms" />
              <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select All Items
              </label>
            </div>
          </div>
          <div className="py-5">
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
                        Make changes to your address here. Click save when
                        you&apos;re done.
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
                    Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3,
                    Kuningan Tim., Kecamatan Setiabudi, Daerah Khusus Ibukota
                    Jakarta 12950
                  </p>

                  <p className="text-zinc-600 leading-none text-xs mt-1">
                    Notes to driver
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <p></p>
        </div>
        <div className="hidden md:block md:col-span-1">
          <h3 className="scroll-m-20 text-xl md:text-2xl border-b-2 pb-2">
            Summary
          </h3>
        </div>
      </div>
    </>
  );
}
