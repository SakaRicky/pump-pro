import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RequestWithToken } from "../utils/middleware";
import {
	validateEditedProduct,
	validateNewProduct
} from "../utils/validateData";
import { NewProduct } from "../types";

const prisma = new PrismaClient();

export const getProducts = async (_req: Request, res: Response) => {
	const allProducts = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			description: true,
			quantity: true,
			purchase_price: true,
			selling_price: true,
			reorder_point: true,
			category: true,
			image: true,
			created_at: true
		}
	});

	return res.send(allProducts);
};

export const getOneProduct = async (req: Request, res: Response) => {
	const { id } = req.params;

	const productFound = await prisma.product.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			description: true,
			quantity: true,
			purchase_price: true,
			selling_price: true,
			reorder_point: true,
			category: true,
			image: true,
			created_at: true
		}
	});
	return res.send(productFound);
};

export const saveProduct = async (req: RequestWithToken, res: Response) => {
	const newProduct = validateNewProduct(req.body);
	const fileUrl = `${req.protocol}://${req.get("host")}/${req.file?.path}`;
	const fileSavedName = fileUrl.split("/").pop();

	if (newProduct) {
		await prisma.product.create({
			data: {
				name: newProduct.name,
				category_id: newProduct.category_id,
				description: newProduct.description,
				purchase_price: newProduct.purchase_price,
				quantity: newProduct.quantity,
				reorder_point: newProduct.reorder_point,
				selling_price: newProduct.selling_price,
				image: req.file
					? `http://localhost:5001/images/products/${fileSavedName}`
					: ""
			}
		});
		return res.sendStatus(200);
	}
};

export const updateProduct = async (req: RequestWithToken, res: Response) => {
	const editedProduct = validateEditedProduct(req.body) as NewProduct & {
		id: string;
	};
	const fileUrl = `${req.protocol}://${req.get("host")}/${req.file?.path}`;
	const fileSavedName = fileUrl.split("/").pop();

	if (editedProduct) {
		await prisma.product.update({
			where: { id: editedProduct.id },
			data: {
				name: editedProduct.name,
				category_id: editedProduct.category_id,
				description: editedProduct.description,
				purchase_price: editedProduct.purchase_price,
				quantity: editedProduct.quantity,
				reorder_point: editedProduct.reorder_point,
				selling_price: editedProduct.selling_price,
				image: req.file
					? `http://localhost:5001/images/users/${fileSavedName}`
					: ""
			}
		});
		return res.sendStatus(200);
	}
};

export const deleteProduct = async (req: RequestWithToken, res: Response) => {
	const body = req.body;
	const productIdsToDelete = body.ids;

	await prisma.product.deleteMany({
		where: {
			id: {
				in: productIdsToDelete
			}
		}
	});

	return res.sendStatus(200);
};
