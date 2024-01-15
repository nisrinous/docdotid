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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { deleteCategory } from "@/lib/fetcher/products";

export function DeleteModal({ token, id }: { token: string; id: unknown }) {
  return (
    <Dialog>
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
          <Button type="submit" onClick={() => deleteCategory(token, id)}>
            Delete Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
