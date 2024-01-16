import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileDataSchema = z.object({
  photo: z.string(),
  name: z
    .string()
    .min(5)
    .refine((val) => !/\d/.test(val), {
      message: "Name should not contain numbers",
    }),
  gender: z.enum(["male", "female"]),
  age: z.number().int().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  email: z.string(),
  password: z.string(),
});

interface ProfileData {
  photo: string;
  name: string;
  gender: "male" | "female";
  age: number;
  height: number;
  weight: number;
  email: string;
  password: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return ProfileDataSchema.parse(response.data);
};

const EditProfile = () => {
  const { data, error } = useSWR<ProfileData>("/api/profile", fetcher);

  const [updatedData, setUpdatedData] = useState({
    name: data?.name || "",
    gender: data?.gender || "male",
    age: data?.age || 0,
    height: data?.height || 0,
    weight: data?.weight || 0,
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
  });

  const handleUpdateProfile = async () => {
    try {
      ProfileDataSchema.parse(updatedData);
      await axios.patch("/api/profile", updatedData);
      mutate("/api/profile");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error("Error updating profile:", error);
      }
    }
  };

  if (error)
    return (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center m-5 sm:m-20 gap-2 sm:gap-5 w-[600px]">
          <img src="text" alt="Profile Photo" />
          <label>
            Name:
            <Input
              type="text"
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
            />
            <div className="text-red-500">{validationErrors.name}</div>
          </label>
          <label>
            Gender:
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="items-center justify-center">
                <SelectItem value="Male" className="p-2">
                  <p className="ml-5">Male</p>
                </SelectItem>
                <SelectItem value="Female" className="p-2">
                  <p className="ml-5">Female</p>
                </SelectItem>
              </SelectContent>
            </Select>
          </label>
          <label>
            Age:
            <Input
              type="number"
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  age: parseInt(e.target.value, 10),
                })
              }
            />
            <div className="text-red-500">{validationErrors.age}</div>
          </label>
          <label>
            Height:
            <Input
              type="number"
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  height: parseInt(e.target.value, 10),
                })
              }
            />
            <div className="text-red-500">{validationErrors.height}</div>
          </label>
          <label>
            Weight:
            <Input
              type="number"
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  weight: parseInt(e.target.value, 10),
                })
              }
            />
            <div className="text-red-500">{validationErrors.weight}</div>
          </label>
          <Button onClick={handleUpdateProfile}>Save</Button>
        </div>
      </div>
    );
  if (!data) return <div className="flex justify-center m-20">Loading...</div>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center m-20 gap-5">
        <img src="text" alt="Profile Photo" />
        <label>
          Name:
          <input
            type="text"
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
          <div className="text-red-500">{validationErrors.name}</div>
        </label>
        <label>
          Gender:
          <select
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                gender: e.target.value as "male" | "female",
              })
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Age:
          <input
            type="number"
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                age: parseInt(e.target.value, 10),
              })
            }
          />
          <div className="text-red-500">{validationErrors.age}</div>
        </label>
        <label>
          Height:
          <input
            type="number"
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                height: parseInt(e.target.value, 10),
              })
            }
          />
          <div className="text-red-500">{validationErrors.height}</div>
        </label>
        <label>
          Weight:
          <input
            type="number"
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                weight: parseInt(e.target.value, 10),
              })
            }
          />
          <div className="text-red-500">{validationErrors.weight}</div>
        </label>
        <Button onClick={handleUpdateProfile}>Save</Button>
      </div>
    </div>
  );
};

export default EditProfile;
