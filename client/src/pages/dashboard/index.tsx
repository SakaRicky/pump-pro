import { Box, useTheme } from "@mui/material";
import withAuth from "hoc/withAuth";
import React from "react";
import { FormattedMessage } from "react-intl";

const Dashboard = () => {
	const theme = useTheme();

	return (
		<Box sx={{ mt: 8 }}>
			<FormattedMessage
				id="dashboard"
				defaultMessage="Dashboard"
				description="Main title for the Dashboard page"
			/>
		</Box>
	);
};

export default withAuth(Dashboard);
