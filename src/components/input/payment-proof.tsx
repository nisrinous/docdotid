import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const UploadPaymentProof = () => {
  const [img, setImg] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
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

  const uploadTodb = () => {};
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Upload Payment Proof</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center rounded-lg">
          {img !== "" ? <img src={img}></img> : null}
          <Input id="picture" type="file" onChange={handleImageChange} />
        </CardContent>
      </Card>
      <Link href="/user/orders">
        <Button
          onClick={uploadTodb}
          disabled={isUploading}
          className="items-end w-full"
        >
          Upload proof
        </Button>
      </Link>
    </div>
  );
};

export default UploadPaymentProof;
