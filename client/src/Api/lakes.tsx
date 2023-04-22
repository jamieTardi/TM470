import axios from "axios";
import { BASEURL } from "../constants";

export const api = axios.create({ baseURL: BASEURL });

export const createLake = (newLake: TLake, handleClearLoading: Function) => {
	api
		.post("/lakes/create", newLake)
		.then(() => handleClearLoading())
		.catch(() => alert("An error occured while creating this lake, please refresh and try again."))
		.catch(() => handleClearLoading());
};

export const getLakes = (userId: string) => {
	api
		.get(`/lakes/${userId}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => alert(err));
};

export const updateLake = (lake: TLake, handleClearLoading: Function) => {
	api

		.patch(`/lakes/update/${lake._id}`, lake)
		.then((res) => console.log(res.data))
		.then(handleClearLoading())
		.catch(() => alert("Something went wrong please try and refresh"));
};

export const deleteLake = (id: string, handleClearLoading: Function) => {
	api
		.delete(`/lakes/delete/${id}`)
		.then(handleClearLoading())
		.catch(() => alert("Something went wrong please try and refresh"))
		.catch(handleClearLoading());
};
