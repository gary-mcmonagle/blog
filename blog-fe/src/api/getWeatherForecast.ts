import axios from "axios";
export const getWeatherForecast = async (accessToken: string) => {
  const bearer = `Bearer ${accessToken}`;
  const data = await axios.get(
    "https://blogservicesadmin-function.azurewebsites.net/api/HttpTrigger1",
    {
      headers: {
        Authorization: bearer,
      },
    }
  );
  return data.data;
};
