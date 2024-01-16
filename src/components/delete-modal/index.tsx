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
import { deleteCategory } from "@/lib/fetcher/products";
import { useState } from "react";
import { mutate } from "swr";

export function DeleteModal({ token, id }: { token: string; id: unknown }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCategory(token, id);
      setOpen(false);
      mutate(["/categories", token]);
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
          <DialogTitle>Delete Product Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product category?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" onClick={handleDelete}>
            Delete Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
