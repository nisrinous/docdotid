import React from "react";
import { Input } from "../ui/input";

interface SearchBarProps {
  table: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ table }) => {
  return (
    <>
      <Input
        placeholder="Filter categories..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </>
  );
};

export default SearchBar;
