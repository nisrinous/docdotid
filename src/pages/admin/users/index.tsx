import React, { useState } from "react";
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
  name: string;
  email: string;
  phone: string;
}

const apiUrl = "www.test.com";

const Product = () => {
  const [userType, setUserType] = useState<string>("");

  const { data, error } = useSWR<Item[]>(
    `${apiUrl}?userType=${userType}`,
    async (url: string) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  const handleButtonClick = (type: string) => {
    setUserType(type);
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <Button onClick={() => handleButtonClick("user")}>User</Button>
        <Button onClick={() => handleButtonClick("doctor")}>Doctor</Button>
        <Button onClick={() => handleButtonClick("adminPharmacy")}>
          Admin Pharmacy
        </Button>

        <h1 className="text-black text-3xl mt-2 font-bold">Manage Products</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: Item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
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
