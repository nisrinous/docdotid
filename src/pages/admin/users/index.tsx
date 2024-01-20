import React, { useState, useEffect } from "react";
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
import { ProductsResponse, UserDetailResponse } from "@/types";
import useSWR from "swr";
import router from "next/router";
import { getUsers } from "@/lib/fetcher/user";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
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
          <Button onClick={onConfirm}>Confirm Delete</Button>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [productsData, setProductsData] = useState<UserDetailResponse[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  const [roleId, setRoleId] = useState(2);

  const fetchData = async () => {
    try {
      const data = await getUsers(token, roleId);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  useEffect(() => {
    const fetchDataWithRoleId = async () => {
      try {
        const data = await getUsers(token, roleId);
        setProductsData(data.data);
      } catch (error) {
        console.error("" + error);
      }
    };

    fetchDataWithRoleId();
  }, [token, roleId]);

  const handleFilterAdminPharmacies = async () => {
    setRoleId(2);
  };

  const handleFilterDoctors = async () => {
    setRoleId(4);
  };

  const handleFilterUsers = async () => {
    setRoleId(3);
  };

  const handleDelete = (productId: number) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    router.push(`/admin/users/add`);
  };

  const confirmDelete = async () => {
    if (productIdToDelete !== null) {
      try {
        await deleteProduct(token, productIdToDelete.toString());
        setShowDeleteModal(false);
        setProductIdToDelete(null);
        fetchData();
      } catch (error) {
        console.error("" + error);
      }
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  };

  useSWR(["/users"], fetchData);

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
        <Button onClick={() => handleAdd()} className="mb-2">
          Add Admin Pharmacy
        </Button>
        <Button
          onClick={() => handleFilterAdminPharmacies()}
          className="mb-2 ml-2"
        >
          Admin Pharmacies
        </Button>
        <Button onClick={() => handleFilterDoctors()} className="mb-2 ml-2">
          Doctors
        </Button>
        <Button onClick={() => handleFilterUsers()} className="mb-2 ml-2">
          Users
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {roleId === 2 && (
                    <>
                      <Button
                        onClick={() => handleEdit(item.id)}
                        className="mr-3"
                      >
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </>
                  )}
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
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default Product;
