/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import Sidebar from "@/components/aside-bar";
import { menus } from "@/utils/menus";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiBaseUrl } from "@/config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import router from "next/router";
import { ProductResponse } from "@/types";
import { getProduct } from "@/lib/fetcher/product";
import toast from "react-hot-toast";

interface DropdownOption {
  id: number;
  name: string;
}

const AddProduct = () => {
  const { id } = router.query;
  const { token } = useSelector((state: RootState) => state.user);
  const [product, setProduct] = useState<ProductResponse | null>(null);

  const fetchData = async () => {
    try {
      const data = await getProduct(id as string);
      setProduct(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  useSWR([`/products/${id}`, token], fetchData);

  const [manufacturerDropdown, setManufacturerDropdown] = useState<
    DropdownOption[] | null
  >(null);
  const [drugClassificationDropdown, setDrugClassificationDropdown] = useState<
    DropdownOption[] | null
  >(null);
  const [drugFormDropdown, setDrugFormDropdown] = useState<
    DropdownOption[] | null
  >(null);
  const [productCategoryDropdown, setProductCategoryDropdown] = useState<
    DropdownOption[] | null
  >(null);

  const fetcher = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: manufacturerOptions, error: manufacturerError } = useSWR(
    `${apiBaseUrl}/manufacturers`,
    fetcher
  );
  const { data: drugClassificationOptions, error: drugClassificationError } =
    useSWR(`${apiBaseUrl}/classifications`, fetcher);
  const { data: drugFormOptions, error: drugFormError } = useSWR(
    `${apiBaseUrl}/forms`,
    fetcher
  );
  const { data: productCategoryOptions, error: productCategoryError } = useSWR(
    `${apiBaseUrl}/categories`,
    fetcher
  );

  useEffect(() => {
    if (manufacturerOptions) {
      setManufacturerDropdown(manufacturerOptions.data);
    }
  }, [manufacturerOptions]);

  useEffect(() => {
    if (drugClassificationOptions) {
      setDrugClassificationDropdown(drugClassificationOptions.data);
    }
  }, [drugClassificationOptions]);

  useEffect(() => {
    if (drugFormOptions) {
      setDrugFormDropdown(drugFormOptions.data);
    }
  }, [drugFormOptions]);

  useEffect(() => {
    if (productCategoryOptions) {
      setProductCategoryDropdown(productCategoryOptions.data);
    }
  }, [productCategoryOptions]);

  const [formData, setFormData] = useState({
    id: (id as string) || "",
    name: "",
    generic_name: "",
    content: "",
    manufacturer_id: 0,
    description: "",
    drug_classification_id: 0,
    drug_form_id: 0,
    product_category_id: 0,
    unit_in_pack: "",
    selling_unit: 0,
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: (product.id as unknown as string) || (id as string) || "",
        name: product.name || "",
        generic_name: product.generic_name || "",
        content: product.content || "",
        manufacturer_id: product.manufacturer_id || 0,
        description: product.description || "",
        drug_classification_id: product.drug_classification_id || 0,
        drug_form_id: product.drug_form_id || 0,
        product_category_id: product.product_category_id || 0,
        unit_in_pack: String(product.unit_in_pack) || "",
        selling_unit: product.selling_unit || 0,
        weight: product.weight || 0,
        height: product.height || 0,
        length: product.length || 0,
        width: product.width || 0,
        image: product.image || "",
      });
    }
  }, [product, id]);

  const [img, setImg] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true);

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", "docdotid");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/minevf/image/upload",
        {
          method: "POST",
          body: fileData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImg(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }

    setIsUploading(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof formData.manufacturer_id === "string") {
      formData.manufacturer_id = parseInt(formData.manufacturer_id, 10);
    }
    if (typeof formData.drug_classification_id === "string") {
      formData.drug_classification_id = parseInt(
        formData.drug_classification_id,
        10
      );
    }
    if (typeof formData.drug_form_id === "string") {
      formData.drug_form_id = parseInt(formData.drug_form_id, 10);
    }
    if (typeof formData.product_category_id === "string") {
      formData.product_category_id = parseInt(formData.product_category_id, 10);
    }
    if (typeof formData.selling_unit === "string") {
      formData.selling_unit = parseInt(formData.selling_unit, 10);
    }
    if (typeof formData.weight === "string") {
      formData.weight = parseInt(formData.weight, 10);
    }
    if (typeof formData.height === "string") {
      formData.height = parseInt(formData.height, 10);
    }
    if (typeof formData.length === "string") {
      formData.length = parseInt(formData.length, 10);
    }
    if (typeof formData.width === "string") {
      formData.width = parseInt(formData.width, 10);
    }

    if (img !== "") {
      formData.image = img;
    }

    try {
      const response = await axios.put(`${apiBaseUrl}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast("Product edit successfully.");
      router.push("/admin/products/");
    } catch (error) {
      toast("Failed to edit product.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="w-full mx-10 mt-5">
        <div className="">
          <h1 className="text-black text-3xl mt-2 font-bold mb-5">
            Edit Product
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-10 w-full">
              <div className="sm:w-[500px]">
                <div className="mb-2 flex flex-col items-center">
                  {img === "" && (
                    <img
                      src={product?.image}
                      width={200}
                      height={200}
                      alt="Picture of the author"
                      className="mb-5"
                    />
                  )}

                  {img !== "" && <img src={img} alt="Product" />}

                  <Input
                    id="picture"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  {isUploading && <p>Uploading image...</p>}
                </div>

                <div className="mb-2">
                  <Label htmlFor="name">Name:</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="generic_name">Generic Name:</Label>
                  <Input
                    type="text"
                    id="generic_name"
                    name="generic_name"
                    value={formData?.generic_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="content">Content:</Label>
                  <Input
                    type="text"
                    id="content"
                    name="content"
                    value={formData?.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="manufacturer">Manufacturer:</Label>
                  <select
                    id="manufacturer"
                    name="manufacturer_id"
                    value={formData?.manufacturer_id || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="0">Select Manufacturer</option>
                    {manufacturerDropdown?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <Label htmlFor="description">Description:</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    value={formData?.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="sm:w-[500px]">
                <div className="mb-2">
                  <Label htmlFor="drug_classification">
                    Drug Classification:
                  </Label>
                  <select
                    id="drug_classification"
                    name="drug_classification_id"
                    value={formData?.drug_classification_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="0">Select Drug Classification</option>
                    {drugClassificationDropdown?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <Label htmlFor="drug_form">Drug Form:</Label>
                  <select
                    id="drug_form"
                    name="drug_form_id"
                    value={formData?.drug_form_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="0">Select Drug Form</option>
                    {drugFormDropdown?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <Label htmlFor="product_category">Product Category:</Label>
                  <select
                    id="product_category"
                    name="product_category_id"
                    value={formData?.product_category_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="0">Select Product Category</option>
                    {productCategoryDropdown?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <Label htmlFor="unit_in_pack">Unit in Pack:</Label>
                  <Input
                    type="text"
                    id="unit_in_pack"
                    name="unit_in_pack"
                    value={formData?.unit_in_pack}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="selling_unit">Price:</Label>
                  <Input
                    type="number"
                    id="selling_unit"
                    name="selling_unit"
                    value={formData?.selling_unit}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="weight">Weight:</Label>
                  <Input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData?.weight}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="height">Height:</Label>
                  <Input
                    type="number"
                    id="height"
                    name="height"
                    value={formData?.height}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="length">Length:</Label>
                  <Input
                    type="number"
                    id="length"
                    name="length"
                    value={formData?.length}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <div className="mb-5 sm:mb-5">
                  <Label htmlFor="width">Width:</Label>
                  <Input
                    type="number"
                    id="width"
                    name="width"
                    value={formData?.width}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <Button type="submit" className="mb-10">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
