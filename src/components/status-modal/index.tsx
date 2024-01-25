import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { mutate } from "swr";
import { updateOrderStatus } from "@/lib/fetcher/orders";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditStatusModal({
  token,
  status,
  id,
}: {
  token: string;
  status: any;
  id: unknown;
}) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSelectChangeCategory = (value: any) => {
    setNewStatus(value);
    handleConfirm();
  };

  const handleConfirm = async () => {
    try {
      if (newStatus === "2") {
        await updateOrderStatus(token, id);
        setOpen(false);
      }
      //   mutate(["/categories", token]);
    } catch (error) {
      console.error("" + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-600 hover:bg-sky-500">
          Edit Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Status of Order</DialogTitle>
          <DialogDescription>
            Update Order Status using the dropdown below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>

            <Select onValueChange={handleSelectChangeCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Waiting For Payment</SelectItem>
                  <SelectItem value="1">
                    Waiting For Payment Confirmation
                  </SelectItem>
                  <SelectItem value="2">Processed</SelectItem>
                  <SelectItem value="3">Sent</SelectItem>
                  <SelectItem value="4">Order Confirmed</SelectItem>
                  <SelectItem value="-1">Cancel Order</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* {inputError && (
              <p className="col-span-4 text-red-500 text-s mt-1">
                {inputError}
              </p>
            )} */}
          </div>
        </div>
        <DialogFooter>
          {/* <Button
            type="submit"
            onClick={handleEdit}
            disabled={inputError !== ""}
          >
            Save changes
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
