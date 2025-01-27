import React, { useState } from "react";
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
import {
  deleteProduct,
  getProductss,
  getProductsByPharmacy,
} from "@/lib/fetcher/product";
import { ProductsResponse } from "@/types";
import useSWR from "swr";
import router from "next/router";
import axios from "axios";
import { apiBaseUrl } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const Product = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<ProductsResponse[]>([]);
  const [productsDataAdd, setProductsDataAdd] = useState<ProductsResponse[]>(
    []
  );
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const { id } = router.query;
  const [editedPrices, setEditedPrices] = useState<Record<number, number>>({});
  const [editedIsActive, setEditedIsActive] = useState<Record<number, boolean>>(
    {}
  );

  const fetchProductsAdd = async () => {
    try {
      const data = await getProductss();
      setProductsDataAdd(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  useSWR(["product"], fetchProductsAdd);

  const fetchData = async () => {
    try {
      const data = await getProductsByPharmacy(token, id);
      setProductsData(data.data);
      console.log(productsData);
    } catch (error) {
      console.error("" + error);
    }
  };

  useSWR(["/products"], fetchData);

  const handleConfirmAdd = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/pharmacies/products`,
        {
          price: price,
          pharmacy_id: typeof id === "string" ? parseInt(id, 10) : undefined,
          product_id:
            typeof selectedProduct === "string"
              ? parseInt(selectedProduct, 10)
              : undefined,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      fetchData();
      toast("Product added successfully");
    } catch (error) {
      toast("Product failed to add");
      console.error("Error adding product:", error);
    }
  };

  const handleSaveEdit = async (productId: number) => {
    try {
      const newPrice =
        editedPrices[productId] ||
        productsData.find((p) => p.id === productId)?.price;

      const newIsActive =
        editedIsActive[productId] !== undefined
          ? editedIsActive[productId]
          : productsData.find((p) => p.id === productId)?.is_active;

      const response = await axios.put(
        `${apiBaseUrl}/pharmacies/products/`,
        {
          id: productId,
          price: newPrice,
          is_active: newIsActive,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      toast("Produc edit success");
      await fetchData();
      console.log("Product updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold mb-5">
          Manage Products
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <p>Choose Product to Add</p>
            <label htmlFor="priceInput" className="mr-2">
              Price:
            </label>
            <input
              type="number"
              id="priceInput"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="Enter price"
              className="border rounded p-1"
            />

            <div>
              <label htmlFor="productDropdown" className="mr-2">
                Select a Product:
              </label>
              <select
                id="productDropdown"
                onChange={(e) => setSelectedProduct(e.target.value)}
                value={selectedProduct || ""}
              >
                <option value="" disabled>
                  Choose a product
                </option>
                {productsDataAdd?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleConfirmAdd}>Confirm</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  {item.is_active ? "Active" : "Not Active"}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="flex flex-col">
                        <label>Price</label>
                        <input
                          type="number"
                          value={editedPrices[item.id] || item.price}
                          onChange={(e) => {
                            setEditedPrices((prevPrices) => ({
                              ...prevPrices,
                              [item.id]: parseInt(e.target.value),
                            }));
                          }}
                          placeholder="Enter price"
                          className="border rounded p-1 mb-2"
                        />

                        <label>Pharmacy status</label>
                        <select
                          value={
                            editedIsActive[item.id] !== undefined
                              ? editedIsActive[item.id].toString()
                              : item.is_active.toString()
                          }
                          onChange={(e) => {
                            setEditedIsActive((prevIsActive) => ({
                              ...prevIsActive,
                              [item.id]: e.target.value === "true",
                            }));
                          }}
                          className="mb-3"
                        >
                          <option value="true">Active</option>
                          <option value="false">Not Active</option>
                        </select>
                        <Button
                          onClick={() => handleSaveEdit(item.id)}
                          className="mr-3"
                        >
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {productsData?.length === 0 && (
          <div className="w-full flex justify-center mt-10">
            <p>No data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
