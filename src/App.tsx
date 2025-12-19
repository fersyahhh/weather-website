import { useState } from "react";
import bgImage from "./assets/bg-image.jpg";
import baseImage from "./assets/base-img.svg";
import {
  MapPin,
  Cloud,
  Sun,
  Thermometer,
  Droplet,
  Wind,
  X,
} from "lucide-react";
import axios from "axios";
import type { WeatherResponse, Location, Current } from "./types/weather";

function App() {
  const [query, setQuery] = useState("");
  const searchCity = query.toLowerCase();
  const [dataLoc, setDataLoc] = useState<Location | null>(null);
  const [dataCur, setDataCur] = useState<Current | null>(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCity}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .get<WeatherResponse>(API_URL)
      .then((res) => {
        const location = res.data.location;
        const current = res.data.current;
        setDataLoc(location);
        setDataCur(current);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    // Backgroud Image
    <div>
      <div className="h-screen w-full">
        <img
          src={bgImage}
          alt="bg-image"
          className="h-full w-full object-cover"
        />

      </div>
      {/* Header */}
      <div className="absolute top-1/2 left-1/2 h-auto w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/20 p-4 backdrop-blur-md md:w-[70%] lg:w-[50%] xl:w-[30%]">
        <form
          onSubmit={handleSubmit}
          className="font-montserrat flex w-full items-center text-white"
        >
          <span className="pl-1">
            <MapPin size={17} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search for a city"
            className="w-[70%] pl-2 outline-none placeholder:text-white"
          />
          <div className="flex w-[30%] items-center justify-end gap-3">
            {query !== "" && (
              <span onClick={() => setQuery("")}>
                <X size={20}></X>
              </span>
            )}

            <button type="submit" className="flex justify-end pr-2">
              Search
            </button>
          </div>
        </form>
        <hr className="my-2 text-white/70" />

        {/* Body */}
        {dataLoc && dataCur ? (
          <div>
            <div className="mt-5 text-center text-white">
              <h1 className="font-montserrat text-2xl font-bold">
                {dataLoc.name}
              </h1>
              <h2 className="font-montserrat text-lg font-semibold">
                ({dataLoc.country})
              </h2>
              <p className="font-open-sans mt-2 text-sm">{dataLoc.localtime}</p>
            </div>

            <div className="mt-6 flex w-full justify-center gap-3 text-white">
              <div className="w-[33%] text-right">
                <h1 className="font-montserrat text-3xl">{dataCur.temp_c}°C</h1>
                <h1 className="font-montserrat">{dataCur.temp_f}°F</h1>
              </div>

              <div className="flex w-[33%] justify-center">
                <div className="h-27 w-30">
                  <img
                    className="h-full w-full drop-shadow-xl drop-shadow-black/30"
                    src={`https:${dataCur.condition.icon}`}
                    alt=""
                  />
                </div>
              </div>

              <div className="font-montserrat flex w-[33%] flex-col gap-3">
                <div className="flex gap-3">
                  <span>
                    <Cloud />
                  </span>
                  <h1>{dataCur.cloud}%</h1>
                </div>
                <div className="flex gap-3">
                  <span>
                    <Thermometer />
                  </span>
                  <h1>{dataCur.feelslike_c}°C</h1>
                </div>
                <div className="flex gap-3">
                  <span>
                    <Sun />
                  </span>
                  <h1>{dataCur.uv}</h1>
                </div>
                <div className="flex gap-3">
                  <span>
                    <Droplet />
                  </span>
                  <h1>{dataCur.humidity}%</h1>
                </div>
                <div className="flex gap-3">
                  <span>
                    <Wind />
                  </span>
                  <h1>{dataCur.wind_kph} kph WSW</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mx-auto h-50 w-50">
              <img className="h-full w-full" src={baseImage} alt="" />
            </div>
            <div className="font-montserrat text-center text-white">
              <h1 className="text-2xl font-bold">Find Your City</h1>
              <p className="font-semibold">
                Get real-time weather information instantly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
