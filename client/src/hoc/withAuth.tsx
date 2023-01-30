import { useEffect, useState } from "react";
import { LogedUser } from "types";
import { setLogedUser, useStateValue } from "state";
import { useNavigate } from "react-router-dom";
import { verifyAuthUser } from "services/auth";
import { AuthError } from "errors/authError";
import { useNotify } from "hooks/useNotify";

function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
	return function Authenticated(props: T) {
		const [state, dispatch] = useStateValue();
		const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
			null
		);
		const navigate = useNavigate();
		const notify = useNotify();

		useEffect(() => {
			const loggedUser: LogedUser = JSON.parse(
				localStorage.getItem("loggedUser") || "{}"
			);

			if (!state.logedUser && Object.keys(loggedUser).length === 0) {
				navigate("/login");
			}

			const checkAuthUser = async () => {
				try {
					const authenticatedStatus = await verifyAuthUser();
					if (authenticatedStatus?.isAuthenticated) {
						dispatch(setLogedUser(loggedUser));
						setIsAuthenticated(true);
					}
				} catch (error: unknown) {
					if (error instanceof AuthError) {
						notify(error.name, error.message, "error");
						// remove this because JWT token has expired
						localStorage.removeItem("loggedUser");
						navigate("/login");
					}
				}
			};

			// if not loggedUser in state but loggedUser in localstorage
			if (!state.logedUser && Object.keys(loggedUser).length !== 0) {
				checkAuthUser();
			}
		}, [dispatch, state.logedUser]);

		return <WrappedComponent {...props} isAuthenticated={isAuthenticated} />;
	};
}

export default withAuth;
