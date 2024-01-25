import React from "react";
import { Input } from "../ui/input";

interface SearchBarProps {
  table: any;
  placeholder: string;
  searchby: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  table,
  placeholder,
  searchby,
}) => {
  return (
    <>
      <Input
        placeholder={`Filter ${placeholder}`}
        value={
          (table.getColumn(`${searchby}`)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn(`${searchby}`)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </>
  );
};

export default SearchBar;
