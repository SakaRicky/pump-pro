export type User = {
	id: string;
	names: string;
	username: string;
	date_of_birth: Date;
	gender: Gender;
	phone: string;
	salary: number;
	CNI_number: string;
	godfather_phone?: string;
	localisation?: string;
	email?: string;
	profile_picture?: string;
	role: Role;
};

export type NewUser = Omit<User, "id" | "password_hash"> & {
	password?: string;
	passwordConfirmation?: string;
};

export enum Gender {
	MALE = "MALE",
	FEMALE = "FEMALE"
}

export interface LogedUser {
	role: Role;
	username: string;
	token?: string;
	profilePicture: string;
}

export enum Role {
	ADMIN = "ADMIN",
	SALE = "SALE",
	PUMPIST = "PUMPIST",
	USER = "USER"
}

export type Alert = {
	show: boolean;
	title: string;
	message: string;
	type: AlertType;
};

export type AlertType = "success" | "error" | "info" | "warning" | undefined;

// export type Notification = "success" | "info" | "warning" | "error" | undefined;

export type Product = {
	id: string;
	name: string;
	category: ProductCategory;
	description?: string;
	image?: string;
	quantity: number;
	purchase_price: number;
	selling_price: number;
	reorder_point: number;
};

export type NewProduct = Omit<Product, "id" | "category"> & {
	category_id: string;
};

export type ProductCategory = {
	id: string;
	name: string;
	description?: string;
};

export type NewProductCategory = Omit<ProductCategory, "id">;
