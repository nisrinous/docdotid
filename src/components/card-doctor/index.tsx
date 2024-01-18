import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { DoctorResponse } from "@/types";

export function CardDoctor({ doctor }: { doctor: Partial<DoctorResponse> }) {
  return (
    <Card className="w-full md:w-80 flex flex-row justify-evenly items-center">
      <div className="flex flex-col items-center gap-1">
        <img
          alt="Profile Image"
          className="w-24 items-center"
          src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/6cb8f67a33376e09150a0ff78061df2e/detailed"
        />
        <Badge className="bg-green-700/60">
          {doctor.is_active ? "Online" : "Offline"}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{doctor.user_name}</h2>
        <p className="text-gray-600 mb-0">{doctor.specialist_name}</p>
        <p className="text-lg font-bold mb-4">${doctor.fee}</p>
        <Link href={`/telemedicine/${doctor?.id}`}>
          <Button className="bottom-4 right-0" variant="outline">
            Start Chat
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
