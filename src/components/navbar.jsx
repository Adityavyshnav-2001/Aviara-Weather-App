import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const Navbar = ({ onSearch }) => {
	const [searchCity, setSearchCity] = useState("");

	const handleSearchClick = () => {
		if (searchCity.trim()) {
			onSearch(searchCity);
		}
	};

	return (
		<nav
			style={{
				justifyContent: "space-between",
				display: "flex",
				alignItems: "center",
				marginTop: "10px",
				padding: "10px",
				paddingLeft: "30px",
				paddingRight: "30px",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
				<FilterDramaTwoToneIcon />
				<p style={{ fontWeight: "bold", fontSize: "20px" }}>Weather</p>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
				<TextField
					variant="outlined"
					placeholder="Search city 'Mumbai'"
					size="small"
					value={searchCity}
					onChange={(e) => setSearchCity(e.target.value)}
					style={{
						backgroundColor: "white",
						borderRadius: "2rem",
						width: "22rem",
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Button
					variant="contained"
					onClick={handleSearchClick}
					style={{ borderRadius: "6px", backgroundColor: "#4B5550" }}
				>
					Search
				</Button>
			</div>
		</nav>
	);
};

export default Navbar;
