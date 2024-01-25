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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { editCategory } from "@/lib/fetcher/product-category";
import { useState } from "react";
import { mutate } from "swr";
import { updateProductStock } from "@/lib/fetcher/stock";

export function UpdateStockModal({
  token,
  name,
  stock,
  id,
}: {
  token: string;
  name: any;
  stock: any;
  id: unknown;
}) {
  const [open, setOpen] = useState(false);
  const [newStock, setNewStock] = useState<any>();
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNewStock(inputValue);

    if (!inputValue.trim()) {
      setInputError("Input should not be empty.");
    } else if (/[A-z!@#$%^&*(),.?":{}|<>]/.test(inputValue)) {
      setInputError("Input should not contain  special characters.");
    } else {
      setInputError("");
    }
  };
  const handleEdit = async () => {
    try {
      if (!newStock.trim()) {
        setInputError("Input should not be empty.");
        return;
      }
      await updateProductStock(token, newStock, id);
      setOpen(false);
      mutate(["/categories", token]);
    } catch (error) {
      console.error("" + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="bg-sky-600 text-white hover:bg-sky-500"
        >
          Update Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product Stock</DialogTitle>
          <DialogDescription>
            Increase or Decrease Product Stock
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>

            <Input
              id="name"
              // value={newCategory}
              defaultValue={name}
              onChange={handleInputChange}
              disabled
              className={`col-span-3 focus rounded-md p-2 ${
                inputError ? "focus:bg-red-200" : ""
              }`}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Stock
            </Label>

            <Input
              id="name"
              // value={newCategory}
              defaultValue={stock}
              onChange={handleInputChange}
              className={`col-span-3 focus rounded-md p-2 ${
                inputError ? "focus:bg-red-200" : ""
              }`}
            />
            {inputError && (
              <p className="col-span-4 text-red-500 text-s mt-1">
                {inputError}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleEdit}
            disabled={inputError !== ""}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
