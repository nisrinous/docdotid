import PromotionsCarousel from "@/components/carousel";
import DoctorCategories from "@/components/categories/doctor-categories";
import ProductCategories from "@/components/categories/product-categories";
import Hero from "@/components/hero";

export default function DashboardUser() {
  return (
    <>
      <Hero />
      <PromotionsCarousel />
      <DoctorCategories />
      <ProductCategories />
    </>
  );
}
