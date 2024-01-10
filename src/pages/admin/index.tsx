import { useState } from "react";
import { getCoordinates } from "../api/geocoding";

const Home: React.FC = () => {
  const [place, setPlace] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSearch = async () => {
    const result = await getCoordinates(place);
    setCoordinates(result);
  };

  return (
    <div>
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {coordinates && (
        <div>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
