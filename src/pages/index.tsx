import PromotionsCarousel from "@/components/carousel";
import DoctorCategories from "@/components/categories/doctor-categories";
import Hero from "@/components/hero";

export default function Dashboard() {
  return (
    <>
      <Hero />
      <PromotionsCarousel />
      <DoctorCategories />
    </>
  );
}
