import React, { useState } from "react";
import Sidebar from "@/components/aside-bar";
import { menus } from "@/utils/menus";
import toast from "react-hot-toast";
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
import { deleteProduct, getProductss } from "@/lib/fetcher/product";
import { ProductsResponse } from "@/types";
import useSWR from "swr";
import router from "next/router";

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
  const [productsData, setProductsData] = useState<ProductsResponse[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategoryId, setCurrentCategoryId] = useState(1);

  const fetchData = async (categoryId: number = 1, page: number = 1) => {
    try {
      const data = await getProductss(categoryId, page);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const handleDelete = (productId: number) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    router.push(`/admin/products/add`);
  };

  const confirmDelete = async () => {
    if (productIdToDelete !== null) {
      try {
        await deleteProduct(token, productIdToDelete.toString());
        setShowDeleteModal(false);
        setProductIdToDelete(null);
        fetchData();
        toast("Product deleted successfully.");
      } catch (error) {
        console.error("" + error);
      }
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  };

  useSWR(["/products"], () => fetchData());

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (hasDataForPage(nextPage)) {
      fetchData(currentCategoryId, nextPage);
      setCurrentPage(nextPage);
    } else {
      console.log("No data available for the next page. Page change canceled.");
    }
  };

  const handlePrevious = () => {
    const prevPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;
    fetchData(currentCategoryId, prevPage);
    setCurrentPage(prevPage);
  };

  const hasDataForPage = (page: number): boolean => {
    return productsData.length > 0;
  };

  const hasDataForCategoryId = async (categoryId: number): Promise<boolean> => {
    try {
      const data = await getProductss(categoryId, 1);
      const hasData = data.data.length > 0;

      if (!hasData) {
        setCurrentCategoryId(1);
        fetchData(1, 1);
      }

      return hasData;
    } catch (error) {
      console.error("" + error);
      return false;
    }
  };

  const handleSortByCategory = async () => {
    const newCategoryId = currentCategoryId + 1;
    const hasData = await hasDataForCategoryId(newCategoryId);

    if (hasData) {
      setCurrentCategoryId(newCategoryId);
      fetchData(newCategoryId, currentPage);
    }
  };

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
        <div className="flex flex-row justify-between">
          <div>
            <Button onClick={() => handleAdd()} className="mb-2">
              Add Product
            </Button>
          </div>
          <div>
            <Button
              onClick={handlePrevious}
              disabled={currentPage <= 1}
              className="mr-2"
            >
              Previous
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead onClick={() => handleSortByCategory()}>
                Category
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Max Price</TableHead>
              <TableHead>Min Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.manufacturer_name}</TableCell>
                <TableCell>{item.max_price}</TableCell>
                <TableCell>{item.min_price}</TableCell>
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
        {productsData?.length === 0 && (
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
