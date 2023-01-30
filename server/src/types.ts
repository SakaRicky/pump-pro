import { Gender, Role } from "@prisma/client";

export type User = {
	id: string;
	names: string;
	username: string;
	date_of_birth: Date;
	gender: Gender;
	phone: string;
	salary: number;
	godfather_phone: string;
	localisation?: string;
	CNI_number: string;
	email?: string;
	password_hash?: string;
	profile_picture?: string;
	role: Role;
};

export type NewUser = Omit<User, "id" | "password_hash"> & {
	password?: string;
};

export type LogginUser = {
	username: string;
	password: string;
};

export type Product = {
	id: string;
	name: string;
	category_id: string;
	description?: string;
	image?: string;
	quantity: number;
	purchase_price: number;
	selling_price: number;
	reorder_point: number;
};

export type NewProduct = Omit<Product, "id" | "category">;

export type ProductCategory = {
	id: string;
	name: string;
	description?: string;
};

export type NewProductCategory = Omit<ProductCategory, "id">;
