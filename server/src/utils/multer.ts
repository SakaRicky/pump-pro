import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

var storage = multer.diskStorage({
	destination: function (req: Request, _file, cb) {
		const uploadsDir = path.resolve(__dirname, "..", "..", "public/images");
		const uploadFolder = path.join(uploadsDir, req.originalUrl.split("/")[1]);

		if (!fs.existsSync(uploadFolder)) {
			fs.mkdirSync(uploadFolder, { recursive: true });
		}
		cb(null, uploadFolder);
	},
	filename: function (_req: Request, file, cb) {
		const savedFileName = Date.now() + path.extname(file.originalname);
		cb(null, savedFileName); //Appending extension
	}
});

export const upload = multer({ storage: storage });
