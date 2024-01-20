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
import { PharmacyResponse } from "@/types";
import useSWR from "swr";
import { apiBaseUrl } from "@/config";
import router from "next/router";
import deleteCookies from "@/components/delete-cookies";
import { getPharmacyListOwned } from "@/lib/fetcher/pharmacy";

const Product = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<PharmacyResponse[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );

  const fetchData = async () => {
    try {
      const data = await getPharmacyListOwned(token);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  useSWR(["/products"], fetchData);

  const handleSeeProducts = (pharmacyId: number) => {
    router.push(`/pharmacyadm/products/${pharmacyId}`);
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold mb-5">
          Choose Pharmacy
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Pharmacy Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Operational Hour</TableHead>
              <TableHead>Operational Day</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.operational_hour}</TableCell>
                <TableCell>{item.operational_day}</TableCell>
                <TableCell>
                  {item.is_active ? "Active" : "Not Active"}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSeeProducts(item.id)}
                    className="mr-3"
                  >
                    See Products
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {productsData.length === 0 && (
          <div className="w-full flex justify-center mt-10">
            <p>No pharmacy available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
