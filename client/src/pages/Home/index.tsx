import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Landing, Login, Dashboard, Staff } from "../index";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "../../components/routes/protected";
import Lakes from "../Lakes";
import { fetchAuth } from "../../Redux/slices/authSlice";
import { useAppDispatch } from "../../Redux/store";

import Logout from "../Logout";
import Customers from "../Customers";
import Bookings from "../Bookings";
import AvailabilityOverview from "../AvailabilityOverview";

const Home = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAuth());
	}, [dispatch]);
	const location = useLocation();

	return (
		<>
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />

					<Route path="/logout" element={<Logout />} />

					<Route
						path={"/dashboard"}
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path={"/lakes"}
						element={
							<ProtectedRoute>
								<Lakes />
							</ProtectedRoute>
						}
					/>
					<Route
						path={"/customers"}
						element={
							<ProtectedRoute>
								<Customers />
							</ProtectedRoute>
						}
					/>

					<Route
						path={"/bookings"}
						element={
							<ProtectedRoute>
								<Bookings />
							</ProtectedRoute>
						}
					/>
					<Route
						path={"/staff"}
						element={
							<ProtectedRoute>
								<Staff />
							</ProtectedRoute>
						}
					/>
					<Route
						path={"/overview"}
						element={
							<ProtectedRoute>
								<AvailabilityOverview />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default React.memo(Home);
