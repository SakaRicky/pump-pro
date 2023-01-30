import express, { RequestHandler } from "express";
import {
	getOneUser,
	getUsers,
	saveUser,
	updateUser,
	deleteUser
} from "../controller/users";
import { upload } from "../utils/multer";
import asyncHandler from "express-async-handler";
import { checkIfAdmin } from "../../middlewares/jwt";

const usersRoute = express.Router();

usersRoute.get("/", asyncHandler(getUsers as RequestHandler));
usersRoute.get("/:id", asyncHandler(getOneUser as RequestHandler));

usersRoute.post(
	"/",
	checkIfAdmin,
	upload.single("file"),
	asyncHandler(saveUser as RequestHandler)
);

usersRoute.put(
	"/",
	checkIfAdmin,
	upload.single("file"),
	asyncHandler(updateUser as RequestHandler)
);

usersRoute.delete(
	"/",
	checkIfAdmin,
	asyncHandler(deleteUser as RequestHandler)
);

export default usersRoute;
