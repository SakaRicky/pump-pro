import { Product } from "types";
import api from "./api";
import { AuthError } from "errors/authError";
import { UserError } from "errors/userError";
import { GridSortModel } from "@mui/x-data-grid";

export const saveProduct = async (newUser: FormData) => {
	try {
		const res = await api.post("/products", newUser, {
			headers: { "Content-Type": "multipart/form-data" }
		});
		return res.data;
	} catch (error: any) {
		console.log("🚀 ~ file: users.ts:13 ~ saveUser ~ error", error);
		if (error.response.status === 409) {
			throw new Error(error.response.data.error);
		}
	}
};

// For now we get 1 and the same teacher the time to implement auth
// This method returns a user(User) for display
export const getProduct = async (id: string): Promise<Product> => {
	const { data } = await api.get<Product>(`/products/${id}`);
	return data;
};

// For now we get 1 and the same teacher the time to implement auth
export const getProducts = async (): Promise<Product[]> => {
	const { data } = await api.get<Product[]>(`/products`);
	return data;
};

// For now we get 1 and the same teacher the time to implement auth
export const updateProduct = async (updateUser: FormData) => {
	try {
		const res = await api.put("/products", updateUser, {
			headers: { "Content-Type": "multipart/form-data" }
		});

		return res.data;
	} catch (error: any) {
		console.log("🚀 ~ file: users.ts:13 ~ saveUser ~ error", error);
		if (error.response.status === 409) {
			throw new UserError({
				name: "USER_ERROR",
				message: error.response.data.error
			});
		}
		if (error.response.status === 401) {
			throw new AuthError({
				name: "AUTH_ERROR",
				message: error.response.data.error
			});
		}
		throw new UserError({
			name: "USER_ERROR",
			message: error.response.data.error
		});
	}
};

export const deleteProduct = async (ids: string[]) => {
	try {
		const res = await api.delete("/products", { data: { ids: ids } });

		return res.data;
	} catch (error: any) {
		if (error.response.status === 409) {
			throw new UserError({
				name: "USER_ERROR",
				message: error.response.data.error
			});
		}
		throw new UserError({
			name: "USER_ERROR",
			message: error.response.data.error
		});
	}
};
