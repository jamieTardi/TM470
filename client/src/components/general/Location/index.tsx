import React, { useState, useCallback } from "react";
import styles from "./location.module.scss";
import cx from "classnames";
import Map, { GeolocateControl, Marker, MarkerDragEvent, LngLat } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoCoder from "./GeoCoder";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

type TProps = {
	className?: string;
	handleUpdateLocation: React.Dispatch<React.SetStateAction<any>>;
	currentLocation: number[];
};

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const Location = ({ className, handleUpdateLocation, currentLocation = [-0.127647, 51.507322] }: TProps) => {
	const initialLocation = {
		longitude: currentLocation[0],
		latitude: currentLocation[1],
		zoom: 15,
	};
	const [gpsLocation, setGpsLocation] = useState<number[]>(currentLocation);
	const long = gpsLocation ? gpsLocation[0] : initialLocation.longitude;
	const lat = gpsLocation ? gpsLocation[1] : initialLocation.latitude;

	const [, logEvents] = useState<Record<string, LngLat>>({});

	const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
		logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
	}, []);

	const onMarkerDrag = useCallback(
		(event: MarkerDragEvent) => {
			logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

			setGpsLocation([event.lngLat.lng, event.lngLat.lat]);
			handleUpdateLocation(gpsLocation);
		},
		[handleUpdateLocation, gpsLocation]
	);

	const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
		logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
	}, []);

	return (
		<div className={cx(styles.location, className)}>
			<h4 className="bold">Location</h4>

			<p>Drag the marker to place at your desired location on the map.</p>

			<div className={styles["location__gps"]}>
				<span>
					<span className="bold">Longitude: </span>
					{long}
				</span>
				<span>
					<span className="bold">latitude: </span>
					{lat}
				</span>
			</div>

			<div className={styles.location__map}>
				<Map
					mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
					initialViewState={initialLocation}
					mapStyle="mapbox://styles/mapbox/streets-v11"
				>
					<GeoCoder setGpsLocation={setGpsLocation} />
					<GeolocateControl
						showUserLocation={true}
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
						onGeolocate={(PositionOptions) => {
							setGpsLocation([PositionOptions["coords"].latitude, PositionOptions["coords"].longitude]);
						}}
					/>
					{Object.keys(gpsLocation).length > 0 ? (
						<Marker
							draggable
							longitude={gpsLocation[0]}
							latitude={gpsLocation[1]}
							onDragStart={onMarkerDragStart}
							onDrag={onMarkerDrag}
							onDragEnd={onMarkerDragEnd}
						>
							<svg
								height={SIZE}
								viewBox="0 0 24 24"
								style={{
									cursor: "pointer",
									fill: "#d00",
									stroke: "none",
									transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
								}}
							>
								<title>
									Location: Longitude {long}, Latitude {lat}
								</title>
								<path d={ICON} />
							</svg>
						</Marker>
					) : null}
				</Map>
			</div>
		</div>
	);
};

export default React.memo(Location);
