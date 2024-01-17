"use client";
import * as React from "react";
import { PharmacyResponse, ProductCategoriesResponse } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getProductCategories } from "@/lib/fetcher/product-category";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
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
import { EditModalPharmacy } from "@/components/edit-modal/pharmacyEdit";
import SearchBar from "@/components/search-bar";
import ColumnDropdown from "@/components/columns-dropdown";
import { getPharmacyList } from "@/lib/fetcher/pharmacy";

export default function Pharmacies() {
  const { token } = useSelector((state: RootState) => state.user);
  const [pharmacyData, setPharmacyData] = useState<PharmacyResponse[]>([]);

  const fetchData = async () => {
    try {
      const data = await getPharmacyList(token);
      console.log("ini data", data);
      setPharmacyData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const { error: isError, isValidating: isLoading } = useSWR(
    ["/pharmacies", token],
    fetchData
  );
  const router = useRouter();
  const data: ProductCategoriesResponse[] = pharmacyData;
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNewCategory(inputValue);

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputValue)) {
      setInputError("Input should not contain numbers or special characters.");
    } else {
      setInputError("");
    }
  };

  const navigateToAdd = () => {
    router.push("/admin/pharmacy/add");
  };

  const handleAddCategory = async () => {
    try {
      const result = await addCategory(token, newCategory);

      console.log("Category added:", result);

      setNewCategory("");
      setOpen(false);
      mutate(["/categories", token]);
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
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Address
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
      accessorKey: "operational_day",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Operational Day
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("operational_day")}</div>,
    },
    {
      accessorKey: "operational_hour",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Operational Hour
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("operational_hour")}</div>,
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.getValue("id");
        const currentCategory = row.getValue("name");
        const currentAddress = row.getValue("address");

        return (
          <div className="flex gap-5">
            <EditModalPharmacy
              token={token}
              address={currentAddress}
              name={currentCategory}
              id={id}
            />
            <EditModalPharmacy
              token={token}
              address={currentAddress}
              name={currentCategory}
              id={id}
            />
            <DeleteModal token={token} id={id} />
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
        <h1 className="text-black text-3xl mt-2 font-bold">
          Manage Pharmacies
        </h1>
        <div className="flex items-center justify-between py-4">
          <SearchBar table={table} />
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-sky-300 hover:bg-sky-200"
              onClick={navigateToAdd}
            >
              Add New
            </Button>

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
