import MapBoxGeoCoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type Props = {
	setGpsLocation: React.Dispatch<React.SetStateAction<any>>;
};

const GeoCoder = ({ setGpsLocation }: Props) => {
	const ctrl = new MapBoxGeoCoder({
		accessToken: process.env.REACT_APP_MAPBOX_KEY!,
		marker: false,
		collapsed: true,
	});
	useControl(() => ctrl);
	ctrl.on("result", (e: any) => {
		const coords = e.result.geometry.coordinates;
		setGpsLocation(coords);
	});
	return null;
};

export default GeoCoder;
