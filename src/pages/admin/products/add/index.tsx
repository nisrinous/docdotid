import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import Sidebar from "@/components/aside-bar";
import { menus } from "@/utils/menus";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DropdownOption {
  Label: string;
  value: string;
}

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    generic_name: "",
    content: "",
    manufacturer: "",
    description: "",
    drug_classification: "",
    drug_form: "",
    product_category: "",
    unit_in_pack: "",
    selling_unit: 0,
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
  });

  const { data: manufacturerOptions, error: manufacturerError } = useSWR<
    DropdownOption[]
  >("www.dropdown.com", async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  const { data: drugClassificationOptions, error: drugClassificationError } =
    useSWR<DropdownOption[]>("www.dropdown1.com", async (url: string) => {
      const response = await axios.get(url);
      return response.data;
    });

  const { data: drugFormOptions, error: drugFormError } = useSWR<
    DropdownOption[]
  >("www.dropdown2.com", async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  const { data: productCategoryOptions, error: productCategoryError } = useSWR<
    DropdownOption[]
  >("www.dropdown3.com", async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <h1 className="text-black text-3xl mt-2 font-bold">Manage Products</h1>
        <form>
          <div>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="generic_name">Generic Name:</Label>
            <Input
              type="text"
              id="generic_name"
              name="generic_name"
              value={formData.generic_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content:</Label>
            <Input
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="manufacturer">Manufacturer:</Label>
            <select
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Manufacturer
              </option>
              {manufacturerOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.Label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="description">Description:</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="drug_classification">Drug Classification:</Label>
            <select
              id="drug_classification"
              name="drug_classification"
              value={formData.drug_classification}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Drug Classification
              </option>
              {drugClassificationOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.Label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="drug_form">Drug Form:</Label>
            <select
              id="drug_form"
              name="drug_form"
              value={formData.drug_form}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Drug Form
              </option>
              {drugFormOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.Label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="product_category">Product Category:</Label>
            <select
              id="product_category"
              name="product_category"
              value={formData.product_category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Product Category
              </option>
              {productCategoryOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.Label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="unit_in_pack">Unit in Pack:</Label>
            <Input
              type="text"
              id="unit_in_pack"
              name="unit_in_pack"
              value={formData.unit_in_pack}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="selling_unit">Selling Unit:</Label>
            <Input
              type="number"
              id="selling_unit"
              name="selling_unit"
              value={formData.selling_unit}
              onChange={handleInputChange}
              min={0}
              defaultValue={0}
            />
          </div>

          <div>
            <Label htmlFor="weight">Weight:</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min={0}
              defaultValue={0}
            />
          </div>

          <div>
            <Label htmlFor="height">Height:</Label>
            <Input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              min={0}
              defaultValue={0}
            />
          </div>

          <div>
            <Label htmlFor="length">Length:</Label>
            <Input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleInputChange}
              min={0}
              defaultValue={0}
            />
          </div>

          <div>
            <Label htmlFor="width">Width:</Label>
            <Input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              min={0}
              defaultValue={0}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
