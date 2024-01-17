import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { deleteProduct, getProducts } from "@/lib/fetcher/product";
import { ProductsResponse } from "@/types";
import useSWR from "swr";

const Product = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<ProductsResponse[]>([]);

  const fetchData = async () => {
    try {
      const data = await getProducts(token);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(token, productId.toString());
      fetchData();
    } catch (error) {
      console.error("" + error);
    }
  };

  useSWR(["/products"], fetchData);

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
            {productsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.manufacturer_name}</TableCell>
                <TableCell>{item.max_price}</TableCell>
                <TableCell>{item.min_price}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
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
