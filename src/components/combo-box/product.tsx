"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Key, useState } from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getProductList } from "@/lib/fetcher/orders";

interface cbType {
  value: any;
  label: string;
  id: number;
  name: string;
}
export function Combobox2() {
  const { token } = useSelector((state: RootState) => state.user);
  const [categoriesList, setCategoriesList] = useState<cbType[]>([]);

  const fetchData = async () => {
    try {
      const data = await getProductList(token);
      const formattedData = data.data.map(({ id, name }: cbType) => ({
        value: id,
        label: name,
      }));
      setCategoriesList(formattedData);
    } catch (error) {
      console.error("" + error);
    }
  };

  const { error: isError, isValidating: isLoading } = useSWR(
    ["/reports/sales/products", token],
    fetchData
  );

  const frameworks = categoriesList;
  console.log(frameworks);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search product..." />

          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
