import axios, { AxiosRequestConfig } from "axios";
import { AuthError } from "errors/authError";
import { BadRequestError } from "errors/badRequestError";
import { ConnectionError } from "errors/connectionError";
import { LogedUser } from "../types";

export const api = axios.create({
	baseURL:
		import.meta.env.VITE_DEVICE === "remote"
			? "http://192.168.100.10:5001"
			: "http://localhost:5001"
});

// console.log("api : ", api.defaults);

api.interceptors.request.use((config: AxiosRequestConfig) => {
	// Get the token from storage (or wherever you store it)
	const loggedUser: LogedUser = JSON.parse(
		localStorage.getItem("loggedUser") || "{}"
	);

	if (Object.keys(loggedUser).length !== 0) {
		// Make sure the config object has a headers property
		if (!config.headers) {
			config.headers = {};
		}

		config.withCredentials = true;
		config.headers.Authorization = `bearer ${loggedUser.token}`;
	}

	// console.log("config: ", config);

	return config;
});

api.interceptors.response.use(
	response => response,
	error => {
		// Handle connection errors here
		if (error.response) {
			console.log("error repsonse");
			console.log("data", error.response.data);
			console.log("status", error.response.status);
			console.log("headers", error.response.headers);
			if (error.response.status === 401) {
				throw new AuthError({
					name: "AUTH_ERROR",
					message: error.response.data.error
				});
			}
			if (error.response.status === 400) {
				throw new BadRequestError({
					name: "BAD_REQUEST_ERROR",
					message: error.response.data.error
				});
			}
		} else if (error.request) {
			console.log("in elseif interceptor", error.request);
		} else {
			console.log("Error in api else", error);
			console.log("Error in api else: message: ", error.message);
		}
		if (error.code === "ERR_NETWORK") {
			throw new ConnectionError({
				name: "Connection_Error",
				message: "Couldn't connect to the server"
			});
		}
		return Promise.reject(error);
	}
);

export default api;
