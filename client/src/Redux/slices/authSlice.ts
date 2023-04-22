import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api/login";
import { FALSE, PENDING, TRUE } from "../constant";

const initialUser: IUser = {
	_id: "",
	firstName: "",
	lastName: "",
	password: "",
	email: "",
	phoneNo: "",
	role: "baliff",
	myLakes: [],
};

export const fetchAuth = createAsyncThunk("auth", async (_, thunkAPI) => {
	const token = localStorage.getItem("lake-token") || "";
	const user = localStorage.getItem("lake-email");

	if (!user || !token) {
		return thunkAPI.rejectWithValue({ error: "An error occured" });
	}
	const headers = {
		authorization: token,
	};
	try {
		const response = await api.get(`/user/auth/${user}`, { headers: headers }).catch(() => localStorage.clear());
		if (!response) {
			return;
		}
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "An error occured" });
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState: { userAuth: PENDING, loading: false, user: {} },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAuth.pending, (state) => {
			state.userAuth = PENDING;
			state.loading = true;
			state.user = initialUser;
		});
		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.userAuth = TRUE;
			state.loading = false;
			state.user = action.payload;
		});
		builder.addCase(fetchAuth.rejected, (state) => {
			state.userAuth = FALSE;
			state.loading = false;
			state.user = initialUser;
		});
	},
});

// this is for configureStore
export default authSlice.reducer;
