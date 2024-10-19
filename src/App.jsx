import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";

const WeatherDashboard = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [city, setCity] = useState("Mumbai");
	const [airQualityData, setAirQualityData] = useState(null);
	const [fiveDayForecast, setFiveDayForecast] = useState(null);
	const [favorites, setFavorites] = useState([]);
	const [viewFavorites, setViewFavorites] = useState(false);
	const [unit, setUnit] = useState("C");

	const API_URL = "http://localhost:5001/favoriteCities";

	useEffect(() => {
		if (!viewFavorites) {
			fetchWeatherData(city);
		}
		fetchFavorites();
	}, [city, viewFavorites]);

	const fetchAirQualityData = (lat, lon) => {
		const API_KEY = "f237b41a7d5b4093be80f5455620cf88";
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
			)
			.then((response) => {
				setAirQualityData(response.data.list[0]);
			})
			.catch((error) =>
				console.error("Error fetching the air quality data:", error)
			);
	};

	const fetchWeatherData = (city) => {
		const API_KEY = "f237b41a7d5b4093be80f5455620cf88";
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
		)
			.then((response) => response.json())
			.then((data) => {
				setWeatherData(data);
				fetchAirQualityData(data.coord.lat, data.coord.lon);
				axios
					.get(
						`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
					)
					.then((response) => {
						setFiveDayForecast(response.data);
					})
					.catch((error) =>
						console.error("Error fetching the 5-day forecast data:", error)
					);
			})
			.catch((error) =>
				console.error("Error fetching the weather data:", error)
			);
	};

	const handleSearch = (searchedCity) => {
		setCity(searchedCity);
	};

	// CRUD Operations with JSON Server

	// Fetch favorite cities
	const fetchFavorites = () => {
		axios
			.get(API_URL)
			.then((response) => {
				setFavorites(response.data);
			})
			.catch((error) => {
				console.error("Error fetching favorite cities:", error);
			});
	};

	// Add city to favorites
	const handleAddToFavorites = () => {
		const cityExists = favorites.some((favorite) => favorite.name === city);

		if (!cityExists) {
			const newFavorite = { name: city };
			axios
				.post(API_URL, newFavorite)
				.then((response) => {
					setFavorites([...favorites, response.data]);
				})
				.catch((error) => {
					console.error("Error adding city to favorites:", error);
				});
		}
	};

	// Delete a favorite city
	const handleDeleteFavorite = (cityId) => {
		axios
			.delete(`${API_URL}/${cityId}`)
			.then(() => {
				setFavorites(favorites.filter((favorite) => favorite.id !== cityId));
			})
			.catch((error) => {
				console.error("Error deleting city from favorites:", error);
			});
	};

	// View favorite cities
	const handleViewFavorites = () => {
		setViewFavorites(true);
	};

	// Handle clicking a favorite city
	const handleFavoriteCityClick = (favoriteCity) => {
		setCity(favoriteCity.name);
		setViewFavorites(false);
	};

	// Go back to dashboard
	const handleBackToDashboard = () => {
		setViewFavorites(false);
	};

	// Toggle temperature unit
	const toggleUnit = () => {
		setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
	};

	// Convert temperature based on the selected unit
	const convertTemperature = (tempC) => {
		return unit === "C" ? tempC : (tempC * 9) / 5 + 32; // Convert to Fahrenheit
	};

	return (
		<div>
			<Navbar onSearch={handleSearch} />
			{viewFavorites ? (
				<div style={{ padding: "30px" }}>
					<h2>Your Favorite Cities</h2>
					{favorites.length > 0 ? (
						<ul>
							{favorites.map((favorite) => (
								<li
									key={favorite.id}
									style={{
										cursor: "pointer",
										margin: "10px 0",
										fontWeight: "bold",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<span onClick={() => handleFavoriteCityClick(favorite)}>
										{favorite.name}
									</span>
									<button
										style={{
											marginLeft: "10px",
											backgroundColor: "red",
											color: "white",
											border: "none",
											padding: "5px",
											borderRadius: "5px",
											cursor: "pointer",
										}}
										onClick={() => handleDeleteFavorite(favorite.id)}
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					) : (
						<p>No favorite cities added yet.</p>
					)}
					<button onClick={handleBackToDashboard}>Back to Dashboard</button>
				</div>
			) : (
				<div style={{ display: "flex", padding: "30px", gap: "20px" }}>
					{weatherData && airQualityData && (
						<>
							<div style={{ flex: "1", marginRight: "10px" }}>
								<MainWeatherCard weatherData={weatherData} unit={unit} />

								<p
									style={{
										fontWeight: "700",
										fontSize: "20px",
										marginTop: "20px",
									}}
								>
									5 Days Forecast
								</p>
								{fiveDayForecast && (
									<FiveDayForecast forecastData={fiveDayForecast} />
								)}
								<button
									onClick={handleAddToFavorites}
									style={{
										marginTop: "20px",
										padding: "10px",
										backgroundColor: "#4B5563",
										color: "white",
										borderRadius: "5px",
									}}
								>
									Add to Favorites
								</button>

								{/* Toggle Button */}
								<div style={{ marginTop: "20px" }}>
									<button
										onClick={toggleUnit}
										style={{
											padding: "10px",
											backgroundColor: "#4B5563",
											color: "white",
											borderRadius: "5px",
										}}
									>
										Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
									</button>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									flex: "0.5",
									gap: "20px",
								}}
							>
								<TodayHighlights
									weatherData={weatherData}
									airQualityData={airQualityData}
								/>
								<button
									onClick={handleViewFavorites}
									style={{
										marginTop: "20px",
										padding: "10px",
										backgroundColor: "#4B5563",
										color: "white",
										borderRadius: "5px",
									}}
								>
									View Favorite Cities
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default WeatherDashboard;
