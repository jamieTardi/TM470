import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api/login";
import { TFilter } from "../../Types/customer";

export const fetchCustomers = createAsyncThunk("customers", async (filter: TFilter, thunkAPI) => {
	if (!filter.id) {
		return;
	}
	try {
		const response = await api
			.get(`/customer/${filter.id}/${filter.filter}/${filter.filterBy}`)
			.catch((err) => console.log(err));
		if (!response) {
			return;
		}
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "An error occured" });
	}
});

export const customersSlice = createSlice({
	name: "customers",
	initialState: { loading: false, customer: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCustomers.pending, (state) => {
			state.loading = true;
			state.customer = null;
		});
		builder.addCase(fetchCustomers.fulfilled, (state, action) => {
			state.loading = false;
			state.customer = action.payload;
		});
		builder.addCase(fetchCustomers.rejected, (state) => {
			state.loading = false;
			state.customer = null;
		});
	},
});

// this is for configureStore
export default customersSlice.reducer;
