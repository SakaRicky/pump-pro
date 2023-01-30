import { LogedUser } from "../types";
import api from "./api";

export const loginUser = async (values: {
	username: string;
	password: string;
}): Promise<LogedUser> => {
	const { data: user } = await api.post<LogedUser>(`auth`, values);

	return user;
};

export const verifyAuthUser = async (): Promise<
	| {
			isAuthenticated: boolean;
	  }
	| undefined
> => {
	const { data: userAuthStatus } = await api.get<{
		isAuthenticated: boolean;
	}>(`/auth/user`);
	return userAuthStatus;
};
