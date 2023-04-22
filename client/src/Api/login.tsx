import axios from "axios";
import { BASEURL } from "../constants";

export const api = axios.create({ baseURL: BASEURL });

export const getUser = (email: string) => {
	return api
		.get(`/user/${email}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

export const createUser = (userData: IUser) => {
	api
		.post(`/user`, userData)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};

export const loginUser = (loginData: TLogin) => {
	api.get(`/user/login`, { params: loginData });
};

export interface LoginRequest {
	email: string;
	password: string;
}

export interface UserResponse {
	token: string;
}

export const callGetUser = (email: string) => {
	const token = localStorage.getItem("lake-token") || "";
	const headers = {
		authorization: token,
	};
	api
		.get(`/user/auth/${email}`, { headers: headers })
		.then(() => true)
		.catch(() => false);
};
