# Weather Dashboard

A React-based Weather Dashboard that provides current weather information, air quality data, and a 5-day weather forecast for cities around the world. Users can also save their favorite cities for quick access.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Obtaining an API Key](#obtaining-an-api-key)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- Current weather information for a specified city.
- Air quality data based on geographical coordinates.
- 5-day weather forecast.
- Ability to save favorite cities for quick access.
- Toggle between Celsius and Fahrenheit.

## Technologies Used

- React
- Axios for API calls
- OpenWeatherMap API
- Tailwind CSS (for styling)
- JSON Server (for simulating a backend)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (comes with Node.js)

### Obtaining an API Key

1. Go to the [OpenWeatherMap website](https://openweathermap.org/).
2. Sign up for an account if you don't have one.
3. Once logged in, navigate to the API section and subscribe to the "Current Weather Data" and "Air Pollution" APIs.
4. After subscribing, you will be able to find your API key on your account dashboard.


### Running the Application

- **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>

- npm install
- npx json-server --watch db.json --port 5001
- npm run dev
- Navigate to http://localhost:3000 to view the application.
