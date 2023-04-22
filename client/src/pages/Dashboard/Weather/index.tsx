import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../../components';
import styles from './weather.module.scss';

type TWeather = {
	condition: { text: string; code: number; icon: string };
	pressure_mb: number;
	temp_c: number;
	wind_dir: string;
	wind_mph: number;
	precip_mm: number;
	uv: number;
	is_day: 1 | 0;
};

const Weather = () => {
	const [weather, setWeather] = useState<TWeather | null>(null);
	useEffect(() => {
		axios
			.get(
				`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=Troyes&aqi=no`,
			)
			.then((res) => setWeather(res.data.current))
			.catch((err) => console.log(err));
	}, []);

	if (!weather) {
		return <Loading />;
	}

	return (
		<section className={styles.weather}>
			<h2 className={styles.weather__title}>Weather for Troyes</h2>
			<h5>
				{weather.is_day === 1 ? 'Daytime conditions' : 'Night conditions'}
			</h5>
			<div className={styles.weather__conditions}>
				<div className={styles.weather__conditions__condition}>
					<span>Conditions:</span> {weather.condition.text}
				</div>
				<img
					className={styles.weather__conditions__image}
					src={weather.condition.icon}
					alt='weather'
				/>
				<div>
					<span>Tempreture: </span>
					{weather.temp_c}℃
				</div>
				<div>
					<span>Pressure: </span>
					{weather.pressure_mb}mb
				</div>
				<div>
					<span>Wind Direction: </span>
					{weather.wind_dir}
				</div>
				<div>
					<span>Wind speed: </span>
					{weather.wind_mph}mph
				</div>
				<div>
					<span>Precipitation: </span>
					{weather.precip_mm}mm
				</div>
				<div>
					<span>UV rating: </span>
					{weather.uv}
				</div>
			</div>
		</section>
	);
};

export default React.memo(Weather);
