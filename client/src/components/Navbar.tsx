import React, { useState } from "react";
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	ArrowDropDownOutlined
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import {
	setDefaultLanguage,
	setLogedUser,
	toggleMode,
	useStateValue
} from "state";
import {
	AppBar,
	Box,
	Button,
	FormControl,
	IconButton,
	InputBase,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	SelectChangeEvent,
	Toolbar,
	Typography,
	useTheme
} from "@mui/material";
import { LogedUser } from "types";
import profilePicture from "assets/images/default_image.png";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
	loggedUser: LogedUser | null;
	isSidebarOpen: boolean;
	isNonMobile: boolean;
	setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const Navbar = ({
	loggedUser,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile
}: NavbarProps) => {
	const theme = useTheme();
	const [state, dispatch] = useStateValue();

	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleLogout = () => {
		dispatch(setLogedUser(null));
		localStorage.removeItem("loggedUser");
		setAnchorEl(null);
		navigate("/login");
	};

	return (
		<AppBar
			sx={{
				position: "fixed",
				top: 0,
				background: theme.palette.background.default,
				boxShadow: 2
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* LEFT SIDE */}
				<FlexBetween>
					{!isNonMobile && (
						<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
							<MenuIcon />
						</IconButton>
					)}
				</FlexBetween>

				{/* RIGHT SIDE */}
				<FlexBetween gap="1.5rem">
					<IconButton onClick={() => dispatch(toggleMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlined sx={{ fontSize: "25px" }} />
						) : (
							<LightModeOutlined sx={{ fontSize: "25px" }} />
						)}
					</IconButton>

					{loggedUser && (
						<FlexBetween>
							<Button
								onClick={handleClick}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									textTransform: "none",
									gap: "1rem"
								}}
							>
								<Box
									component="img"
									alt="profile"
									src={
										state.logedUser?.profilePicture
											? state.logedUser.profilePicture
											: profilePicture
									}
									height="32px"
									width="32px"
									borderRadius="50%"
									sx={{
										objectFit: "cover"
									}}
								/>
								<Box textAlign="left">
									<Typography
										fontWeight="bold"
										fontSize="0.85rem"
										sx={{ color: theme.palette.primary.main }}
									>
										{loggedUser.username}
									</Typography>
								</Box>

								<ArrowDropDownOutlined
									sx={{ color: theme.palette.primary.main, fontSize: "25px" }}
								/>
							</Button>
							<Menu
								anchorEl={anchorEl}
								open={isOpen}
								onClose={handleClose}
								anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
							>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
							<FormControl
								sx={{
									m: 1,
									minWidth: 120,
									display: { xs: "none", md: "block" }
								}}
								size="small"
							>
								<Select
									labelId="demo-select-small"
									value={state.language}
									sx={{
										borderRadius: 0
									}}
									onChange={(event: SelectChangeEvent) => {
										dispatch(
											setDefaultLanguage(event.target.value as "en" | "fr")
										);
									}}
								>
									<MenuItem value="en">English</MenuItem>
									<MenuItem value="fr">Francais</MenuItem>
								</Select>
							</FormControl>
						</FlexBetween>
					)}
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
