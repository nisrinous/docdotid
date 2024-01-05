import { Card, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DeliveryCourierCard = () => {
  return (
    <>
      <Card className="px-5 w-full flex flex-col justify-start items-start gap-1 pb-5">
        <CardHeader className="p-0 pb-2 w-full flex flex-row items-center justify-between">
          <h3 className="text-lg mt-3">Delivery Courier</h3>
        </CardHeader>
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
      </Card>
    </>
  );
};

export default DeliveryCourierCard;
