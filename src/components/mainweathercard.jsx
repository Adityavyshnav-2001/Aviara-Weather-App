import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; 
import AcUnitIcon from "@mui/icons-material/AcUnit"; 
import CloudIcon from "@mui/icons-material/Cloud";

const MainWeatherCard = ({ weatherData, unit }) => {
	const temperatureCelsius = weatherData?.main?.temp || 0; // Default to 0 for calculations
	const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
	const cityName = weatherData?.name || "City not available";
	const countryName = weatherData?.sys?.country || "Country not available";
	const timestamp = weatherData?.dt || null;

	const currentDate = timestamp
		? new Date(timestamp * 1000).toLocaleDateString("en-US", {
				weekday: "long",
				day: "numeric",
				month: "short",
		  })
		: "Date not available";

	// Function to convert Celsius to Fahrenheit
	const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

	// Determine temperature based on the selected unit
	const displayTemperature =
		unit === "F" ? convertToFahrenheit(temperatureCelsius) : temperatureCelsius;

	const renderTemperatureIcon = () => {
		if (displayTemperature > 73) {
			// 23°C is 73°F
			return (
				<WbSunnyIcon
					style={{ marginLeft: "10px", fontSize: "3rem", color: "orange" }}
				/>
			);
		} else if (displayTemperature < 50) {
			// 10°C is 50°F
			return (
				<AcUnitIcon
					style={{ marginLeft: "10px", fontSize: "3rem", color: "blue" }}
				/>
			);
		} else {
			return (
				<CloudIcon
					style={{ marginLeft: "10px", fontSize: "3rem", color: "gray" }}
				/>
			);
		}
	};

	return (
		<div
			style={{
				backgroundColor: "#4B5563",
				color: "white",
				borderRadius: "0.5rem",
				width: "160px",
				padding: "30px",
			}}
		>
			<div style={{ fontSize: "20px" }}>Now</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					fontSize: "35px",
					fontWeight: "bold",
				}}
			>
				{displayTemperature.toFixed(2)}°{unit}{" "}
				{/* Display the unit based on the selected unit */}
				{renderTemperatureIcon()}
			</div>
			<div style={{ fontSize: "15px", marginTop: "8px", fontWeight: "50" }}>
				{weatherDescription}
			</div>
			<div style={{ marginTop: "1rem" }}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<CalendarMonthIcon />
					{currentDate}
				</div>
				<div
					style={{ marginTop: "4px", display: "flex", alignItems: "center" }}
				>
					<LocationOnIcon />
					{cityName}, {countryName}
				</div>
			</div>
		</div>
	);
};

export default MainWeatherCard;
