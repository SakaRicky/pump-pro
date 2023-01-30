import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { RequestWithToken } from "../utils/middleware";
import { validateEditedUser, validateNewUser } from "../utils/validateData";
import { NewUser } from "../types";

const prisma = new PrismaClient();

export const getUsers = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const allUsers = await prisma.user.findMany({
			select: {
				id: true,
				names: true,
				username: true,
				date_of_birth: true,
				email: true,
				phone: true,
				gender: true,
				godfather_phone: true,
				salary: true,
				profile_picture: true,
				role: true,
				CNI_number: true,
				localisation: true,
				created_at: true
			}
		});
		return res.send(allUsers);
	} catch (error) {
		next(error);
	}
};

export const getOneUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		const foundUser = await prisma.user.findFirst({
			where: {
				id: id
			},
			select: {
				id: true,
				names: true,
				username: true,
				email: true,
				phone: true,
				gender: true,
				godfather_phone: true,
				salary: true,
				profile_picture: true,
				role: true,
				created_at: true
			}
		});
		return res.send(foundUser);
	} catch (error) {
		next(error);
	}
};

export const saveUser = async (req: RequestWithToken, res: Response) => {
	const newUser = validateNewUser(req.body);
	const fileUrl = `${req.protocol}://${req.get("host")}/${req.file?.path}`;
	const fileSavedName = fileUrl.split("/").pop();

	if (newUser) {
		const saltRounds = 10;
		let password_hash = "";
		if (newUser?.password) {
			password_hash = await bcrypt.hash(newUser?.password, saltRounds);
		}
		await prisma.user.create({
			data: {
				username: newUser.username,
				names: newUser.names,
				email: newUser.email,
				date_of_birth: newUser.date_of_birth,
				gender: newUser.gender,
				phone: newUser.phone,
				salary: newUser.salary,
				godfather_phone: newUser.godfather_phone,
				localisation: newUser.localisation,
				CNI_number: newUser.CNI_number,
				password_hash: password_hash,
				role: newUser.role,
				profile_picture: req.file
					? `http://localhost:5001/images/users/${fileSavedName}`
					: ""
			}
		});
		return res.sendStatus(200);
	}
};

export const updateUser = async (req: RequestWithToken, res: Response) => {
	const editedUser = validateEditedUser(req.body) as NewUser & { id: string };
	const fileUrl = `${req.protocol}://${req.get("host")}/${req.file?.path}`;
	const fileSavedName = fileUrl.split("/").pop();
	const existingUser = await prisma.user.findUnique({
		where: { id: editedUser.id }
	});

	if (editedUser) {
		const saltRounds = 10;
		let password_hash = "";
		if (editedUser?.password) {
			password_hash = await bcrypt.hash(editedUser?.password, saltRounds);
		}

		await prisma.user.update({
			where: { id: editedUser.id },
			data: {
				username: editedUser.username,
				names: editedUser.names,
				email: editedUser.email,
				date_of_birth: editedUser.date_of_birth,
				gender: editedUser.gender,
				phone: editedUser.phone,
				salary: editedUser.salary,
				godfather_phone: editedUser.godfather_phone,
				localisation: editedUser.localisation,
				CNI_number: editedUser.CNI_number,
				password_hash: password_hash
					? password_hash
					: existingUser?.password_hash,
				role: editedUser.role,
				profile_picture: req.file
					? `http://localhost:5001/images/users/${fileSavedName}`
					: ""
			}
		});
		return res.sendStatus(200);
	}
};

export const deleteUser = async (req: RequestWithToken, res: Response) => {
	const body = req.body;
	const userIdToDelete = body.id;
	await prisma.user.delete({ where: { id: userIdToDelete } });

	return res.sendStatus(200);
};
