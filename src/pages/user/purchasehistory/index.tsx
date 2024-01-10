import PurchasedCard from "@/components/card/purchased-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PurchaseHistory() {
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
                  <PurchasedCard id={3} type="Medical " />
                </TabsContent>
                <TabsContent value="telemedicines" className="mb-10">
                  {" "}
                  <PurchasedCard id={3} type="Telemedicine " />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
