import axios from "axios";
import { BASEURL } from "../constants";

export const api = axios.create({ baseURL: BASEURL });

export const createStaff = (userData: IUser) => {
	api
		.post(`/user/create-user`, userData)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};
