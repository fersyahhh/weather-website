export interface Location {
  name: string;
  country: string;
  localtime: string;
}

export interface Current {
  cloud: number;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  uv: number;
  humidity: number;
  wind_kph: number;
  condition: {
    icon: string;
    text: string;
  };
}

export interface WeatherResponse {
  location: Location;
  current: Current;
}
