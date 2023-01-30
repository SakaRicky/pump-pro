import express from "express";
import session from "express-session";
import cors from "cors";
import { setHeaders, requestLogger, unknownEndpoint } from "./utils/middleware";
import config from "./utils/config";
import bodyParser from "body-parser";

import authRouter from "./routes/auth";
import usersRoute from "./routes/user";
import { errorHandler } from "./errors";
import path from "path";
import { checkTokenExistence, tokenExtractor } from "../middlewares/jwt";
import productsRoutes from "./routes/products";
import categoriesRoutes from "./routes/categories";

// Create a new express app
const app = express();

const corsOptions = {
	origin: [
		"http://localhost:5173",
		"http://127.0.0.1:5173",
		"http://localhost:3000",
		"http://192.168.100.10:3000"
	],
	credentials: true,
	optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.static(path.join(path.resolve(__dirname, ".."), "public")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	session({
		secret: config.SESSION_SECRET,
		resave: true,
		saveUninitialized: false
	})
);

// Add headers before the routes are defined
app.use(setHeaders);

app.use(requestLogger);

app.use("/auth", authRouter);
app.use(tokenExtractor);
app.use(checkTokenExistence);
app.use("/users", usersRoute);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
