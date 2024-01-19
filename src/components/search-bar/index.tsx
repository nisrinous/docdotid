import React from "react";
import { Input } from "../ui/input";

interface SearchBarProps {
  table: any;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ table, placeholder }) => {
  return (
    <>
      <Input
        placeholder={`Filter ${placeholder}`}
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
