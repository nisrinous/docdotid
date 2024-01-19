"use client";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FaWhatsapp } from "react-icons/fa6";
import { menus } from "@/utils/menus";
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
import useSWR from "swr";
import SearchBar from "@/components/search-bar";
import ColumnDropdown from "@/components/columns-dropdown";
import { getOrders } from "@/lib/fetcher/orders";
import { OrdersResponse } from "@/types";

export default function Orders() {
  const { token } = useSelector((state: RootState) => state.user);
  const [ordersData, setOrdersData] = useState<OrdersResponse[]>([]);

  const fetchData = async () => {
    try {
      const data = await getOrders(token);
      console.log("ini data", data);
      const formattedData = data.data.map(
        ({ pharmacy, ...rest }: OrdersResponse) => ({
          ...rest,
          pharmacy_id: pharmacy.id,
          pharmacy_name: pharmacy.name,
          pharmacy_phone: pharmacy.phone,
        })
      );
      console.log(formattedData);
      setOrdersData(formattedData);
    } catch (error) {
      console.error("" + error);
    }
  };

  const { error: isError, isValidating: isLoading } = useSWR(
    ["/categories", token],
    fetchData
  );

  const data = ordersData;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleContactWhatsapp = (phoneNumber: any) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStatusString = (status: number) => {
    switch (status) {
      case 0:
        return "Waiting for payment";
      case 1:
        return "Waiting for payment confirmation";
      case 2:
        return "Processed";
      case 3:
        return "Sent";
      case 4:
        return "Order confirmed";
      case -1:
        return "Cancelled";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-yellow-500"; // Waiting for payment
      case 1:
        return "bg-orange-500"; // Waiting for payment confirmation
      case 2:
        return "bg-green-500"; // Processed
      case 3:
        return "bg-blue-500"; // Sent
      case 4:
        return "bg-teal-500"; // Order confirmed
      case -1:
        return "bg-red-500"; // Canceled
      default:
        return "bg-gray-500"; // Unknown Status
    }
  };

  const columns: ColumnDef<any>[] = [
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
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`rounded-lg py-1 px-2 max-w-fit ${getStatusColor(
            row.getValue("status")
          )}`}
        >
          {getStatusString(row.getValue("status"))}
        </div>
      ),
    },
    {
      accessorKey: "total_price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Total Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("total_price")}</div>,
    },
    {
      accessorKey: "pharmacy_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Pharmacy Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("pharmacy_name")}</div>,
    },
    {
      accessorKey: "pharmacy_phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Pharmacy Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("pharmacy_phone")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const pharmacy_number = row.getValue("pharmacy_phone");
        console.log(pharmacy_number);
        return (
          <div className="flex gap-5">
            <Button
              className="bg-green-600 hover:bg-green-500"
              onClick={() => handleContactWhatsapp(pharmacy_number)}
            >
              <FaWhatsapp size={25} /> {"  "} Chat on WhatsApp
            </Button>
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
        <h1 className="text-black text-3xl mt-2 font-bold">Manage Orders</h1>
        <div className="flex items-center justify-between py-4">
          <SearchBar table={table} placeholder="orders" searchby="name" />
          <div className="flex gap-3">
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
