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
  getProducts,
  getProductsByPharmacy,
} from "@/lib/fetcher/product";
import { ProductsResponse } from "@/types";
import useSWR from "swr";
import router from "next/router";

interface AddConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AddConfirmationModal: React.FC<AddConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-50 top-0 left-0"></div>
      <div className="modal-container fixed bg-white rounded shadow-lg top-center p-4 top-[300px] left-[60px] sm:top-80 sm:left-[800px]">
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Add</Button>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<ProductsResponse[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productIdToAdd, setProductIdToAdd] = useState<number | null>(null);
  const { id } = router.query;

  const fetchData = async () => {
    try {
      const data = await getProductsByPharmacy(token, id);
      setProductsData(data.data);
      console.log(productsData);
    } catch (error) {
      console.error("" + error);
    }
  };

  const handleAdd = (productId: number) => {
    setProductIdToAdd(productId);
    setShowAddModal(true);
  };

  const confirmAdd = async () => {
    if (productIdToAdd !== null) {
      try {
        await deleteProduct(token, productIdToAdd.toString());
        setShowAddModal(false);
        setProductIdToAdd(null);
        fetchData();
      } catch (error) {
        console.error("" + error);
      }
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setProductIdToAdd(null);
  };
  useSWR(["/products"], fetchData);

  const handleEdit = (productId: number) => {
    router.push(`/admin/products/${productId}`);
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold mb-5">
          Manage Products
        </h1>
        <Button onClick={() => handleAdd(item.id)}>Add</Button>
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
            {productsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  {item.is_active ? "Active" : "Not Active"}
                </TableCell>{" "}
                <TableCell>
                  <Button onClick={() => handleEdit(item.id)} className="mr-3">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {productsData.length === 0 && (
          <div className="w-full flex justify-center mt-10">
            <p>No data available.</p>
          </div>
        )}
        <AddConfirmationModal
          isOpen={showAddModal}
          onClose={closeAddModal}
          onConfirm={confirmAdd}
        />
      </div>
    </div>
  );
};

export default Product;
