import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api/login";

import { defaultLakeState } from "../../state/lake";

export const fetchLakes = createAsyncThunk("lakes", async (userId: string, thunkAPI) => {
	if (!userId) {
		return;
	}

	try {
		const response = await api.get(`/lakes/${userId}`).catch((err) => console.log(err));
		if (!response) {
			return;
		}
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "An error occured" });
	}
});

export const lakesSlice = createSlice({
	name: "lakes",
	initialState: { loading: false, lakes: [defaultLakeState] },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchLakes.pending, (state) => {
			state.loading = true;
			state.lakes = [defaultLakeState];
		});
		builder.addCase(fetchLakes.fulfilled, (state, action) => {
			state.loading = false;
			state.lakes = action.payload;
		});
		builder.addCase(fetchLakes.rejected, (state) => {
			state.loading = false;
			state.lakes = [defaultLakeState];
		});
	},
});

// this is for configureStore
export default lakesSlice.reducer;
