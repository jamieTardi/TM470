import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import lakeReducer from "./slices/lakeSlice";
import { useDispatch } from "react-redux";
import customersReducer from "./slices/customersSlice";
import bookingsReducer from "./slices/bookingsSlice";
import staffReducer from "./slices/staffSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		lakes: lakeReducer,
		customersState: customersReducer,
		bookingsState: bookingsReducer,
		staffState: staffReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
