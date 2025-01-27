import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSticky from "@/components/cart/cart-sticky";
import DoctorHeader from "@/components/header/doctor";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  const router = useRouter();

  if (router.pathname.includes("/auth")) return children;
  if (router.pathname.includes("/admin")) return children;
  if (router.pathname.includes("/pharmacyadm")) return children;

  if (router.pathname.includes("/doctor"))
    return (
      <>
        <DoctorHeader />
        {children}
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
