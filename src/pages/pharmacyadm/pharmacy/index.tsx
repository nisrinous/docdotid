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
import { deleteProduct } from "@/lib/fetcher/product";
import { PharmacyResponse } from "@/types";
import useSWR from "swr";
import { apiBaseUrl } from "@/config";
import router from "next/router";
import deleteCookies from "@/components/delete-cookies";
import { deletePharmacy, getPharmacyListOwned } from "@/lib/fetcher/pharmacy";

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

  const handleAdd = () => {
    router.push(`/pharmacyadm/pharmacy/add`);
  };

  const handleDelete = (productId: number) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (pharmacyId: string) => {
    if (productIdToDelete !== null) {
      try {
        await deletePharmacy(token, pharmacyId);
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

  useSWR(["/products"], fetchData);

  const handleEdit = (pharmacyId: number) => {
    router.push(`/pharmacyadm/pharmacy/${pharmacyId}`);
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold mb-5">
          Manage Pharmacy
        </h1>
        <Button onClick={() => handleAdd()} className="mb-2">
          Add Pharmacy
        </Button>
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
            {productsData?.map((item) => (
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
                  <Button onClick={() => handleEdit(item.id)} className="mr-3">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
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
