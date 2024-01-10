import useSWR from "swr";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AsideBar from "@/components/aside-bar";

interface Category {
  id: number;
  name: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Index = () => {
  const { data: categories, error } = useSWR<Category[]>(
    "/api/categories",
    fetcher
  );

  //   if (error) return <div>Error loading data</div>;
  //   if (!categories) return <div>Loading...</div>;

  return (
    <div className="flex flex-row">
      <AsideBar />
      <Table>
        <TableCaption>A list of categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </div>
  );
};

export default Index;
