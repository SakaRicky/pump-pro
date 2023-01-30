import { State } from "state/state";
import { Alert, LogedUser } from "types";

export type Action =
	| { type: "SET_MODE" }
	| { type: "SET_ALERT"; payload: Alert | null }
	| { type: "SET_LANGUAGE"; payload: "en" | "fr" }
	| { type: "SET_LOGGED_USER"; payload: LogedUser | null };

export const toggleMode = (): Action => {
	return { type: "SET_MODE" };
};

export const setLogedUser = (loggedUser: LogedUser | null): Action => {
	return { type: "SET_LOGGED_USER", payload: loggedUser };
};

export const setAlert = (alert: Alert | null): Action => {
	return { type: "SET_ALERT", payload: alert };
};

export const setDefaultLanguage = (lang: "en" | "fr"): Action => {
	return { type: "SET_LANGUAGE", payload: lang };
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_MODE":
			return { ...state, mode: state.mode === "dark" ? "light" : "dark" };

		case "SET_ALERT":
			return { ...state, alert: action.payload };

		case "SET_LANGUAGE":
			return { ...state, language: action.payload };

		case "SET_LOGGED_USER":
			return { ...state, logedUser: action.payload };
		default:
			return state;
	}
};
