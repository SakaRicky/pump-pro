import React, { useState } from "react";
import { Alert, AlertTitle, Box, Snackbar, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import { Role } from "types";
import { useStateValue } from "state";

const Layout = () => {
	const [state, dispatch] = useStateValue();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
			<Snackbar
				open={state.alert?.show}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={state.alert?.type}>
					<AlertTitle>{state.alert?.title}</AlertTitle>
					{state.alert?.message}
				</Alert>
			</Snackbar>
			<Sidebar
				user={{}}
				isNonMobile={isNonMobile}
				drawerWidth="250px"
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box width="100%">
				<Navbar
					loggedUser={{
						role: Role.USER,
						username: "test_username",
						profilePicture: ""
					}}
					isSidebarOpen={isSidebarOpen}
					isNonMobile={isNonMobile}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Box mt="4rem">
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default Layout;
