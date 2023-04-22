import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api/login";

export const fetchStaff = createAsyncThunk("staff", async (parentId: string, thunkAPI) => {
	if (!parentId) {
		return;
	}
	try {
		const response = await api.get(`/staff/${parentId}`).catch((err) => console.log(err));
		if (!response) {
			return;
		}
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "An error occured" });
	}
});

export const staffSlice = createSlice({
	name: "staff",
	initialState: { loading: false, staff: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchStaff.pending, (state) => {
			state.loading = true;
			state.staff = null;
		});
		builder.addCase(fetchStaff.fulfilled, (state, action) => {
			state.loading = false;
			state.staff = action.payload;
		});
		builder.addCase(fetchStaff.rejected, (state) => {
			state.loading = false;
			state.staff = null;
		});
	},
});

// this is for configureStore
export default staffSlice.reducer;
