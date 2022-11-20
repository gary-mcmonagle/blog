import axios from "axios";
export const getWeatherForecast = async (accessToken: string) => {
    const bearer = `Bearer ${accessToken}`
      const data = await axios.get("https://garyblogservices.azurewebsites.net/api/GaryTest", 
  {
    headers: {
        Authorization: bearer
    }
  });
  return data.data;
};
