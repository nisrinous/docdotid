import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteCategory } from "@/lib/fetcher/product-category";
import { useState } from "react";
import { mutate } from "swr";
import { deleteProduct } from "@/lib/fetcher/stock";

export function DeleteStockModal({
  token,
  id,
}: {
  token: string;
  id: unknown;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(token, id);
      setOpen(false);
      mutate([`/pharmacies/products/${id}`, token]);
    } catch (error) {
      console.error("" + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="bg-red-400 hover:bg-red-300">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" onClick={handleDelete}>
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
