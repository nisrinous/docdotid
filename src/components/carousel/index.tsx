import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PromotionsCarousel = () => {
  const promos: string[] = [
    "Retail markdown-pana.svg",
    "Combo offer-pana.svg",
    "Discount-pana.svg",
    "12.12 Sale-pana.svg",
    "Pop-up-pana.svg",
  ];

  return (
    <div className="container my-20 flex flex-col justify-center items-center">
      <h3 className="scroll-m-20 text-3xl tracking-tight text-center mt-5">
        This Month&apos;s Promotion
      </h3>
      <div className="p-5">
        {" "}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-7 mb-10"
        >
          <CarouselContent>
            {promos.map((value, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <Link href="/" key={index}>
                      <CardContent className="p-0 flex flex-row h-40 md:h-44 items-center justify-center">
                        <img src={value} className="h-full"></img>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
export default PromotionsCarousel;