import { Gender, Role } from "@prisma/client";
import { z } from "zod";
import {
	NewProduct,
	NewProductCategory,
	NewUser,
	Product,
	ProductCategory
} from "../types";

const NewUserSchema = z.object({
	names: z.string().min(3),
	username: z.string().min(3),
	date_of_birth: z.date(),
	gender: z.enum([Gender.FEMALE, Gender.MALE]),
	phone: z.string().min(9),
	salary: z.number().positive(),
	godfather_phone: z.string(),
	localisation: z.string().optional(),
	CNI_number: z.string(),
	email: z.string().optional(),
	password: z.string().optional(),
	profile_picture: z.string().url().optional(),
	role: z.enum([Role.ADMIN, Role.PUMPIST, Role.SALE, Role.USER])
});

export const validateNewUser = (data: any): NewUser | undefined => {
	data.date_of_birth = new Date(data.date_of_birth);
	data.salary = Number.parseInt(data.salary);
	const parsedData = NewUserSchema.parse(data);

	return parsedData;
};

export const validateEditedUser = (data: any): NewUser | undefined => {
	const EditedUserSchema = NewUserSchema.extend({
		id: z.string()
	});
	data.date_of_birth = new Date(data.date_of_birth);
	data.salary = Number.parseInt(data.salary);
	const parsedData = EditedUserSchema.parse(data);

	return parsedData;
};

const NewProductCategorySchema = z.object({
	name: z.string(),
	description: z.string().optional()
});

const ProductCategorySchema = NewProductCategorySchema.extend({
	id: z.string()
});

const NewProductSchema = z.object({
	name: z.string().min(3),
	category_id: z.string(),
	description: z.string().optional(),
	quantity: z.number(),
	purchase_price: z.number(),
	selling_price: z.number(),
	reorder_point: z.number()
});

export const validateNewProduct = (data: any): NewProduct | undefined => {
	data.quantity = Number.parseInt(data.quantity);
	data.purchase_price = Number.parseInt(data.purchase_price);
	data.selling_price = Number.parseInt(data.selling_price);
	data.reorder_point = Number.parseInt(data.reorder_point);
	const parsedData = NewProductSchema.parse(data);

	return parsedData;
};

export const validateEditedProduct = (data: any): Product | undefined => {
	const EditedProductSchema = NewProductSchema.extend({
		id: z.string()
	});
	data.quantity = Number.parseInt(data.quantity);
	data.purchase_price = Number.parseInt(data.purchase_price);
	data.selling_price = Number.parseInt(data.selling_price);
	data.reorder_point = Number.parseInt(data.reorder_point);
	const parsedData = EditedProductSchema.parse(data);

	return parsedData;
};

export const validateNewProductCategory = (
	data: any
): NewProductCategory | undefined => {
	const parsedData = NewProductCategorySchema.parse(data);
	return parsedData;
};

export const validateEditedProductCategory = (
	data: any
): ProductCategory | undefined => {
	const parsedData = ProductCategorySchema.parse(data);

	return parsedData;
};
