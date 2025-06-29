# MCP Weather Server

A Model Context Protocol (MCP) server that provides weather information using the WeatherAPI service.

## Features

- **Weather Tool**: Get real-time current temperature for any city worldwide
- **Multiple Transport Options**: Supports both STDIO and Server-Sent Events (SSE) transports (legacy)

## Prerequisites

- Node.js 18 or higher
- A WeatherAPI key from [weatherapi.com](https://www.weatherapi.com/)
- pnpm (recommended) or npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mcpserver-ts
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
WEATHER_API_KEY=your_weatherapi_key_here
PORT=3000
```

## Building and Running

### Build the project:
```bash
pnpm build
```

### Start the server:
```bash
pnpm start
```

## Usage

### With MCP Clients

This server can be used with MCP-compatible clients in two ways:

#### 1. Server-Sent Events (SSE) - Recommended for web clients

Configure your MCP client to connect to:
```
http://localhost:3000/sse
```

For production deployment (eg: on Render):
```
https://your-deployment-url.com/sse
```

#### 2. STDIO Transport - For command-line clients

The server includes commented STDIO transport code that can be uncommented.

## MCP Client Configuration

Example VS Code SSE MCP configuration (`.vscode/mcp.json`):

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "weather-api-key",
      "description": "Weather API Key",
      "password": true
    }
  ],
  "servers": {
    "weather-mcp-server": {
      "type": "sse",
      // or "https://your-deployment-url.com/sse"
      "url": "http://localhost:3000/sse" 
    }
  }
}
```