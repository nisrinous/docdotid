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
import { editPharmacyCategory } from "@/lib/fetcher/product-category-pharmacy";

export function EditModalPharmacy({
  token,
  name,
  id,
  pharmacy_id,
}: {
  token: string;
  name: any;
  id: unknown;
  pharmacy_id: any;
}) {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setNewCategory(inputValue);

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputValue)) {
      setInputError("Input should not contain numbers or special characters.");
    } else {
      setInputError("");
    }
  };
  const handleEdit = async () => {
    try {
      await editPharmacyCategory(token, newCategory, id, pharmacy_id);
      setOpen(false);
      mutate(["/pharmacies/category", token]);
    } catch (error) {
      console.error("" + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-sky-600 hover:bg-sky-500">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pharmacy</DialogTitle>
          <DialogDescription>
            Input details for the edited pharmacy here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Pharmacy Name
            </Label>

            <Input
              id="name"
              // value={newCategory}
              defaultValue={name}
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

// address: string;
// postal_code: number;
// latitude: number;
// longitude: number;
// city_code: number;
// operational_hour: string;
// operational_day: string;
// is_active: boolean;
// pharmacist_id: number;
