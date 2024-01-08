import { CardDoctor } from "@/components/card-doctor";
import React from "react";

const Telemedicine = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap w-[1500px] gap-4 m-10">
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
      </div>
    </div>
  );
};

export default Telemedicine;
