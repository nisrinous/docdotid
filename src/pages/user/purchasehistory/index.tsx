import PurchasedCard from "@/components/card/purchased-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMedicineOrders } from "@/lib/fetcher/purchase-history";
import { RootState } from "@/store/store";
import { MedicineOrderResponse } from "@/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function PurchaseHistory() {
  const { token } = useSelector((state: RootState) => state.user);

  const [ordersData, setOrdersData] = useState<MedicineOrderResponse[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getMedicineOrders(token);
      setOrdersData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(["/specialist", token], fetchCategories);

  return (
    <>
      <div className="container my-10 ">
        <h3 className="scroll-m-20 text-2xl md:text-3xl my-5">
          Purchase History
        </h3>
        <div className="grid grid-cols-1 grid-rows-2 gap-10 pb-5">
          <div className="col-span-3">
            <div className="flex flex-col md:flex-row gap-10 mb-10">
              <Tabs defaultValue="all" className="w-full bg-none">
                <TabsList className="bg-none w-full items-start justify-start gap-5">
                  <TabsTrigger value="all" className="bg-none">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="bg-none">
                    Medication Orders
                  </TabsTrigger>
                  <TabsTrigger value="telemedicines" className="bg-none">
                    Telemedicines
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mb-10"></TabsContent>
                <TabsContent value="orders" className="mb-10">
                  {isLoading ? (
                    <p className="text-zinc-400 mb-5">Loading...</p>
                  ) : isError ? (
                    <div className="flex justify-center">
                      <div className="flex flex-wrap justify-center">
                        <p className="text-zinc-400 mb-5">
                          Error while fetching data
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {ordersData &&
                        ordersData.map((item, index) => (
                          <PurchasedCard
                            key={index}
                            id={3}
                            type="Medical "
                            order={item}
                          />
                        ))}
                    </>
                  )}
                </TabsContent>
                <TabsContent value="telemedicines" className="mb-10">
                  {/* <PurchasedCard id={3} type="Telemedicine " /> */}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
