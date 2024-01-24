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
import { deleteProduct, getUsers } from "@/lib/fetcher/user"; // Update import
import { UserDetailResponse } from "@/types";
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
        <p>Are you sure you want to delete this user?</p>
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
  const [usersData, setUsersData] = useState<UserDetailResponse[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [roleId, setRoleId] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (page: number = 1) => {
    try {
      const data = await getUsers(token, roleId, page);
      setUsersData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, roleId]);

  const handleFilterAdminPharmacies = () => {
    setRoleId(2);
    fetchUsers();
  };

  const handleFilterDoctors = () => {
    setRoleId(4);
    fetchUsers();
  };

  const handleFilterUsers = () => {
    setRoleId(3);
    fetchUsers();
  };

  const handleDelete = (userId: number) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    router.push(`/admin/users/add`);
  };

  const confirmDelete = async () => {
    if (userIdToDelete !== null) {
      try {
        await deleteProduct(token, userIdToDelete.toString());
        setShowDeleteModal(false);
        setUserIdToDelete(null);
        fetchUsers();
      } catch (error) {
        console.error("" + error);
      }
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleEdit = (userId: number) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (hasDataForPage(nextPage)) {
      fetchUsers(nextPage);
      setCurrentPage(nextPage);
    } else {
      console.log("No data available for the next page. Page change canceled.");
    }
  };

  const handlePrevious = () => {
    const prevPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;
    fetchUsers(prevPage);
    setCurrentPage(prevPage);
  };

  const hasDataForPage = (page: number): boolean => {
    return usersData.length > 0;
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold mb-5">
          Manage Users
        </h1>
        <div className="flex flex-row justify-between">
          <div>
            <Button onClick={() => handleAdd()} className="mb-2">
              Add Admin Pharmacy
            </Button>
          </div>
          <div>
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
          </div>
        </div>
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
            {usersData?.map((item) => (
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
        {usersData.length === 0 && (
          <div className="w-full flex justify-center mt-10">
            <p>No data available.</p>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className="mr-2"
          >
            Previous
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
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
