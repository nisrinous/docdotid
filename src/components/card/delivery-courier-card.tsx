import { Card, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DeliveryCourierCard = ({
  isChosen,
  deliveryCourierId,
}: {
  isChosen: boolean;
  deliveryCourierId?: number;
}) => {
  return (
    <>
      <Card className="px-5 w-full flex flex-col justify-start items-start gap-1 pb-5">
        <CardHeader className="p-0 pb-2 w-full flex flex-row items-center justify-between">
          <h3 className="text-lg mt-3">Delivery Courier</h3>
        </CardHeader>
        {!isChosen && (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a delivery courier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Official Instant">
                <p>Official Instant</p>
                <p className="text-sky-700">Rp harga</p>
              </SelectItem>
              <SelectItem value="Official SameDay">
                <p>Official SameDay</p>
                <p className="text-sky-700">Rp harga</p>
              </SelectItem>
              <SelectItem value="Non-Official NextDay">
                <p>Non-Official NextDay</p>
                <p className="text-sky-700">Rp harga</p>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        {isChosen && (
          <div className="flex flex-row gap-5 justify-start items-center">
            <img
              src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/f92808fec203cf5720831ec8186a054f/detailed"
              alt={deliveryCourierId ? deliveryCourierId : ""}
              className="w-16 lg:w-24"
            />
            <p className="leading-none text-base">
              Delivery: {deliveryCourierId ? deliveryCourierId : ""}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};

export default DeliveryCourierCard;
