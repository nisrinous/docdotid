import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { JSX, SVGProps } from "react";

export function CardDoctor() {
  return (
    <Card className="w-72 flex flex-row justify-evenly items-center">
      <div className="">
        <img
          alt="Profile Image"
          className="w-16 lg:w-24 items-center"
          src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/6cb8f67a33376e09150a0ff78061df2e/detailed"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold mb-2">Doctor</h2>
        <p className="text-gray-600 mb-0">Derma Specialist</p>
        <p className="text-lg font-bold mb-4">$99.99</p>
        <Button className="bottom-4 right-0" variant="outline">
          Start Chat
        </Button>
      </CardContent>
    </Card>
  );
}
