import axios from "axios";
import { BASEURL } from "../constants";
import { ICustomer } from "../Types/customer";

const api = axios.create({ baseURL: BASEURL });

export const createCustomer = (customer: ICustomer, handleClearLoading: Function) => {
	api
		.post("/customer/create", customer)
		.then(handleClearLoading())
		.catch((err) => alert(err))
		.catch(handleClearLoading());
};

export const updateCustomer = (customer: ICustomer, handleClearLoading: Function) => {
	api
		.patch(`/customer/update/${customer._id}`, customer)
		.then(handleClearLoading())
		.catch((err) => alert(err))
		.catch(handleClearLoading());
};

export const deleteCustomer = (customerId: string, handleClearLoading: Function) => {
	api
		.delete(`/customer/delete/${customerId}`)
		.then(handleClearLoading())
		.catch((err) => alert(err))
		.catch(handleClearLoading());
};

export const searchCustomers = (
	searchTerm: string,
	setUpdateCustomers: React.Dispatch<React.SetStateAction<any>>,
	setIsSearchLoading: React.Dispatch<React.SetStateAction<any>>
) => {
	api
		.get(`/customer/search/${searchTerm}`)
		.then((res) => setUpdateCustomers(res.data))
		.then(() => setIsSearchLoading(false))
		.catch((err) => alert(err));
};

export const getSingleCustomer = (id: string, setCustomer: React.Dispatch<React.SetStateAction<any>>) => {
	api
		.get(`/customer/find/${id}`)
		.then((res) => setCustomer(res.data))
		.catch((err) => alert(err));
};
