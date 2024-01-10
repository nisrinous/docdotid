import useSWR from "swr";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Dropdown from "@/components/filter-dropdown";
import AsideBar from "@/components/aside-bar";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { IoLogoWhatsapp } from "react-icons/io";

import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
const handleSearch = async (url: string) => {};

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>();
  const { data: categories, error } = useSWR<Category[]>(
    "/api/categories",
    fetcher
  );
  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
  };

  //   if (error) return <div>Error loading data</div>;
  //   if (!categories) return <div>Loading...</div>;

  return (
    <div className="flex flex-row">
      <AsideBar />
      <div className="w-full mx-10 mt-5">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl mt-2">Manage Orders</h1>
          <div className="flex gap-5">
            <Dropdown
              buttonLabel={selectedStatus ?? "Edit Status"}
              menuItems={["Pending", "On Progress", "Completed"]}
              defaultSelected={selectedStatus}
              onSelect={(newStatus) => handleStatusChange(newStatus)}
            />
            <SearchBar
              id="table-search"
              placeholder="Search for addresses by city..."
              onChange={handleSearch}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell className="flex gap-3">
                <Button className="">
                  <MdEmail />
                </Button>
                <Button className="bg-green-500 hover:bg-green-400">
                  <IoLogoWhatsapp />
                </Button>
              </TableCell>
            </TableRow>
            {/* {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Index;
