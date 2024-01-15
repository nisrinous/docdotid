import { CardDoctor } from "@/components/card-doctor";
import DoctorCategories from "@/components/categories/doctor-categories";
import React from "react";

const Telemedicine = () => {
  return (
    <>
      <DoctorCategories />
      <div className="container my-10 flex flex-col justify-center pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Cardiologist
        </h3>
        <div className="flex justify-center">
          <div className="container flex flex-wrap gap-4 my-10 justify-start">
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
      </div>
    </>
  );
};

export default Telemedicine;
