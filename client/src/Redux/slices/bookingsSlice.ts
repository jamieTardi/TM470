import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api/login";

export const fetchBookings = createAsyncThunk("bookings", async (date: string, thunkAPI) => {
	if (!date) {
		return;
	}
	try {
		const response = await api.get(`/bookings/${date}`).catch((err) => console.log(err));
		if (!response) {
			return;
		}
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "An error occured" });
	}
});

export const bookingsSlice = createSlice({
	name: "bookings",
	initialState: { loading: false, bookings: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBookings.pending, (state) => {
			state.loading = true;
			state.bookings = null;
		});
		builder.addCase(fetchBookings.fulfilled, (state, action) => {
			state.loading = false;
			state.bookings = action.payload;
		});
		builder.addCase(fetchBookings.rejected, (state) => {
			state.loading = false;
			state.bookings = null;
		});
	},
});

export default bookingsSlice.reducer;
