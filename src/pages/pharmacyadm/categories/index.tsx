"use client";
import * as React from "react";
import {
  PharmaciesOwnedListResponse,
  ProductCategoriesResponse,
} from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getProductCategories } from "@/lib/fetcher/product-category";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { menus } from "@/utils/menus";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Sidebar from "@/components/aside-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DeleteModal } from "@/components/delete-modal";
import { addCategory } from "@/lib/fetcher/product-category";
import useSWR, { mutate } from "swr";
import { EditModalCategory } from "@/components/edit-modal";
import SearchBar from "@/components/search-bar";
import ColumnDropdown from "@/components/columns-dropdown";
import {
  addCategoryPharmacy,
  getProductsPharmacy,
} from "@/lib/fetcher/product-category-pharmacy";
import { getPharmacyOwnedList } from "@/lib/fetcher/pharmacy";
import { EditModalPharmacy } from "@/components/edit-modal/pharmacyEdit";
import { DeleteModalPharmacy } from "@/components/delete-modal/pharmacyDelete";

export default function Categories() {
  const { token } = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<ProductCategoriesResponse[]>(
    []
  );
  const [pharmaciesOwnedList, setPharmaciesOwnedList] = useState<
    PharmaciesOwnedListResponse[]
  >([]);

  const fetchData = async () => {
    try {
      const data = await getProductsPharmacy(token);
      const pharmacyList = await getPharmacyOwnedList(token);
      console.log("ini data", data);
      console.log("data2", pharmacyList);
      setProductsData(data.data);
      setPharmaciesOwnedList(pharmacyList.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const { error: isError, isValidating: isLoading } = useSWR(
    ["/categories", token],
    fetchData
  );

  const data: ProductCategoriesResponse[] = productsData;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [inputError, setInputError] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<
    number | undefined
  >();
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNewCategory(inputValue);

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputValue)) {
      setInputError("Input should not contain numbers or special characters.");
    } else {
      setInputError("");
    }
  };

  const handleSelectChange = (value: any) => {
    setSelectedPharmacy(value);
    setError(value ? "" : "Please select a pharmacy.");
  };

  const handleAddCategory = async () => {
    try {
      if (!selectedPharmacy && !newCategory) {
        setError("Please select a pharmacy.");
        setError("Please input a category.");
        return;
      }
      console.log("ini pharmacyj", selectedPharmacy);
      const result = await addCategoryPharmacy(
        token,
        newCategory,
        selectedPharmacy
      );

      console.log("Category added:", result);

      setNewCategory("");
      setOpen(false);
      mutate(["/pharmacies/categories", token]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const columns: ColumnDef<ProductCategoriesResponse, any>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "pharmacy_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Pharmacy
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const pharmacyId = row.getValue("pharmacy_id");
        const pharmacy: any = pharmaciesOwnedList.find(
          (pharmacy) => pharmacy.id === pharmacyId
        );
        return <div>{pharmacy ? pharmacy.name : pharmacyId}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.getValue("id");
        const pharmacy_id = row.getValue("pharmacy_id");
        const currentCategory = row.getValue("name");

        return (
          <div className="flex gap-5">
            <EditModalPharmacy
              token={token}
              name={currentCategory}
              id={id}
              pharmacy_id={pharmacy_id}
            />
            <DeleteModalPharmacy token={token} id={id} />
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-2xl mt-2 font-bold">
          Manage Product Categories
        </h1>
        <div className="flex items-center justify-between py-4">
          <SearchBar
            table={table}
            placeholder="pharmacies"
            searchby="pharmacy_id"
          />
          <div className="flex gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-sky-300 hover:bg-sky-200"
                >
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product Category</DialogTitle>
                  <DialogDescription>
                    Input details for the new product category here. Click save
                    when done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center px-4 gap-4">
                    <Label htmlFor="name" className="text-right">
                      Pharmacy
                    </Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Pharmacy" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(pharmaciesOwnedList) &&
                          pharmaciesOwnedList.map((pharmacy) => (
                            <SelectItem key={pharmacy.id} value={pharmacy.id}>
                              {pharmacy.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Category Name
                    </Label>

                    <Input
                      id="name"
                      value={newCategory}
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
                    onClick={handleAddCategory}
                    disabled={inputError !== ""}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <ColumnDropdown table={table} />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isError && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    Error loading data. Please try again later.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !isError && table?.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isLoading ? "Loading..." : "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-sky-200"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-sky-200"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
