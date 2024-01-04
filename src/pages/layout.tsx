import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSticky from "@/components/cart/cart-sticky";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  const router = useRouter();

  if (router.pathname.includes("/auth")) return children;

  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartSticky />
    </>
  );
}
