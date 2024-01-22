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

const AddProduct = () => {
  const { token } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    license: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiBaseUrl}/auth/pharmacist`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div className="container flex justify-start sm:mt-5 p-3">
        <div className="">
          <h1 className="text-black text-3xl mt-2 font-bold mb-5 sm:mb-[50px]">
            Add Admin Pharmacy
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-10 w-full">
              <div className="sm:w-[500px]">
                <div className="mb-2">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <div className="mb-5 sm:mb-5">
                  <Label htmlFor="password">Password:</Label>
                  <Input
                    type="text"
                    id="password"
                    name="password"
                    value={formData?.password}
                    onChange={handleInputChange}
                    min={0}
                    defaultValue={0}
                  />
                </div>

                <div className="mb-5 sm:mb-5">
                  <Label htmlFor="license">License:</Label>
                  <Input
                    type="text"
                    id="license"
                    name="license"
                    value={formData?.license}
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
