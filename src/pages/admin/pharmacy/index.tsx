import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setFixLat, setFixLng } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import Sidebar from "@/components/aside-bar";
import { menus } from "@/utils/menus";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const GeocodeInformation: React.FC<{ combinedLocation: string }> = ({
  combinedLocation,
}) => {
  const { data, error } = useSWR(
    `https://api.opencagedata.com/geocode/v1/json?q=${combinedLocation}&key=10fc2f8c13c547f38158e817cb6457d6`,
    fetcher
  );
  const dispatch = useDispatch();

  if (error) return <div>Failed to load geocode information</div>;
  if (!data) return <div>Loading geocode information...</div>;

  const { lat, lng } = data.results[0].geometry;

  dispatch(setFixLat(lat));
  dispatch(setFixLng(lng));

  return (
    <div>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>
      <LeafletMap lat={lat} lng={lng} />
    </div>
  );
};

const LeafletMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const handleMarkerMove = () => {};

  const LeafletMapComponent = dynamic(() => import("@/components/leaflet"), {
    ssr: false,
  });

  return (
    <LeafletMapComponent lat={lat} lng={lng} onMarkerMove={handleMarkerMove} />
  );
};

const IndexPage: React.FC = () => {
  const { data, error } = useSWR("/api/fetchProvinceCity", fetcher);
  const fixLat = useSelector((state: RootState) => state.user.fixLat);
  const fixLng = useSelector((state: RootState) => state.user.fixLng);
  const [receiver, setReceiver] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [street, setStreet] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [combinedLocation, setCombinedLocation] = useState<string>("");

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const uniqueProvinces = Array.from(
    new Set<string>(data.map((item: any) => item.province))
  );
  const citiesInSelectedProvince = data.filter(
    (item: any) => item.province === selectedProvince
  );

  const handleCombineLocation = () => {
    const formattedLocation = `${selectedProvince ? selectedProvince : ""}${
      selectedCity ? `, ${selectedCity}` : ""
    }`.replace(/ /g, "+");

    setCombinedLocation(formattedLocation);
  };

  const handleSave = async () => {
    try {
      let finalLat: string | undefined = Cookies.get("finalLat");
      let finalLng: string | undefined = Cookies.get("finalLng");
      Cookies.remove("finalLat");
      Cookies.remove("finalLng");

      if (!finalLat) finalLat = fixLat.toString();
      if (!finalLng) finalLng = fixLng.toString();

      const postData = {
        name: receiver,
        phone: phone,
        description: description,
        address: `${selectedProvince}, ${selectedCity}, ${street}`,
        postal_code: postalCode,
        latitude: finalLat,
        longitude: finalLng,
        city_code: selectedCity,
      };

      console.log(postData);
      const response = await axios.post("https://test.com", postData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar menus={menus} />
      <div>
        <div>
          <label>Receiver: </label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Select Province: </label>
          <select
            value={selectedProvince || ""}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedCity(null);
            }}
          >
            <option value="">Select Province</option>
            {uniqueProvinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <label>Select City: </label>
            <select
              value={selectedCity || ""}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="">Select City</option>
              {citiesInSelectedProvince.map((city: any) => (
                <option
                  key={city.city_id}
                  value={`${city.type} ${city.city_name}`}
                >
                  {`${city.type} ${city.city_name}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>Street: </label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          <label>Postal Code: </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={handleCombineLocation}>
            Get Latitude and Longitude
          </Button>
        </div>
        {combinedLocation && (
          <div>
            <h2>Combined Location:</h2>
            <p>{combinedLocation}</p>
            <h2>Geocode Information:</h2>
            <GeocodeInformation combinedLocation={combinedLocation} />
            <Button onClick={handleSave}>Save</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
