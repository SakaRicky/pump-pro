import express, { RequestHandler } from "express";

import { upload } from "../utils/multer";
import asyncHandler from "express-async-handler";
import { checkIfAdmin } from "../../middlewares/jwt";
import {
	deleteProduct,
	updateProduct,
	getOneProduct,
	getProducts,
	saveProduct
} from "../controller/products";

const productsRoutes = express.Router();

productsRoutes.get("/", asyncHandler(getProducts as RequestHandler));

productsRoutes.get(
	"/:id",
	checkIfAdmin,
	asyncHandler(getOneProduct as RequestHandler)
);

productsRoutes.post(
	"/",
	checkIfAdmin,
	upload.single("file"),
	asyncHandler(saveProduct as RequestHandler)
);

productsRoutes.put(
	"/",
	checkIfAdmin,
	upload.single("file"),
	asyncHandler(updateProduct as RequestHandler)
);

productsRoutes.delete(
	"/",
	checkIfAdmin,
	asyncHandler(deleteProduct as RequestHandler)
);

export default productsRoutes;
