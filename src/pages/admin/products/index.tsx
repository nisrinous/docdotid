import React from "react";
import useSWR from "swr";
import axios from "axios";
import Sidebar from "@/components/aside-bar";
import { menus } from "@/utils/menus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Item {
  id: number;
  category: string;
  name: string;
  manufacturer: string;
  max_price: number;
  min_price: number;
}

const dummyData: Item[] = [
  {
    id: 1,
    category: "Electronics",
    name: "Laptop",
    manufacturer: "Dell",
    max_price: 1200,
    min_price: 800,
  },
  {
    id: 2,
    category: "Clothing",
    name: "T-Shirt",
    manufacturer: "Nike",
    max_price: 30,
    min_price: 20,
  },
];

const apiUrl = "12modwnd";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Product = () => {
  //   const { data, error } = useSWR(apiUrl, fetcher);

  //   if (error) {
  //     return <div>Error fetching data</div>;
  //   }

  //   if (!data) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold">Manage Products</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Max Price</TableHead>
              <TableHead>Min Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((item: Item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.manufacturer}</TableCell>
                <TableCell>{item.max_price}</TableCell>
                <TableCell>{item.min_price}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Product;
