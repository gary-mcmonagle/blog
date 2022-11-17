import axios from "axios";
export const getWeatherForecast = async () => {
  const data = await axios.get("https://localhost:7110/WeatherForecast");
  return data.data;
};
