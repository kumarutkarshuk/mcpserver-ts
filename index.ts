import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";

if (!process.env.WEATHER_API_KEY) {
  throw new Error("Weather API key not found");
}

type WeatherData = {
  temperatureCelsius?: number;
  error?: string;
};

const getWeatherByCityName = async (city: string): Promise<WeatherData> => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;
  try {
    const res = await fetch(url);
    const resJson = await res.json();

    if (resJson?.current?.temp_c) {
      return {
        temperatureCelsius: resJson.current.temp_c,
      };
    }

    return {
      error: "error fetching weather details",
    };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "unknown error occurred",
    };
  }
};

const server = new McpServer({
  name: "mcp-server-weather",
  version: "1.0.0",
});

server.registerTool(
  "getWeatherByCityName",
  {
    title: "weather tool",
    description: "get weather of a city",
    inputSchema: { city: z.string() },
  },
  async ({ city }) => ({
    content: [
      { type: "text", text: JSON.stringify(await getWeatherByCityName(city)) },
    ],
  })
);

async function init() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

init();
