import React from "react";
import {
	Box,
	Drawer,
	Typography,
	useTheme,
	IconButton,
	List
} from "@mui/material";
import { LogedUser } from "types";
import FlexBetween from "./FlexBetween";
import {
	AdminPanelSettings,
	ChevronLeft,
	Home,
	LocalGasStation,
	ReceiptLong,
	Today,
	TrendingUp
} from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import { FormattedMessage } from "react-intl";
import SidebarNavItem from "./SidebarNavItem";
import { blue } from "@mui/material/colors";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";

const navItems = [
	{
		text: "Dashboard",
		icon: <Home />,
		translate: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
	},
	{
		text: "Products",
		icon: <InventoryIcon />,
		translate: <FormattedMessage id="products" defaultMessage="Products" />
	},

	{
		text: "Shop",
		icon: <ShoppingBagIcon />,
		translate: <FormattedMessage id="shop" defaultMessage="Shop" />
	},

	{
		text: "Sales",
		icon: <ReceiptLong />,
		translate: <FormattedMessage id="sales" defaultMessage="Sales" />
	},
	{
		text: "Daily",
		icon: <Today />,
		translate: <FormattedMessage id="daily" defaultMessage="Daily" />
	},

	{
		text: "Admin",
		icon: <AdminPanelSettings />,
		translate: <FormattedMessage id="admin" defaultMessage="Admin" />
	},
	{
		text: "Perfomance",
		icon: <TrendingUp />,
		translate: <FormattedMessage id="perfomance" defaultMessage="Perfomance" />
	},
	{
		text: "Workers",
		icon: <GroupsIcon />,
		translate: <FormattedMessage id="workers" defaultMessage="Workers" />
	}
];

interface SidebarProp {
	isSidebarOpen: boolean;
	drawerWidth: string;
	isNonMobile: boolean;
	setIsSidebarOpen: (isSidebarOpen: boolean) => void;
	user: LogedUser | {};
}
const Sidebar = ({
	isSidebarOpen,
	drawerWidth,
	isNonMobile,
	setIsSidebarOpen
}: SidebarProp) => {
	const theme = useTheme();

	return (
		<Box component="nav" sx={{ boxShadow: 0 }}>
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						height: "100%",

						"& .MuiDrawer-paper": {
							backgroundColor: theme.palette.background.alt,
							boxSizing: "border-box",
							borderWidth: isNonMobile ? 0 : "2px",
							width: drawerWidth
						}
					}}
				>
					<Box m="1.5rem 2rem 2rem 3rem">
						<FlexBetween>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
								gap="0.5rem"
							>
								<Box
									sx={{
										color: blue[500],
										display: "flex",
										alignItems: "flex-end"
									}}
								>
									<Typography variant="h3" fontWeight="bold">
										PrumPro
									</Typography>
									<LocalGasStation sx={{ width: "2rem", height: "2rem" }} />
								</Box>
							</Box>
							{!isNonMobile && (
								<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
									<ChevronLeft />
								</IconButton>
							)}
						</FlexBetween>
					</Box>
					<List
						sx={{ ml: 4, display: "flex", flexDirection: "column", gap: 2 }}
					>
						{navItems.map(({ text, icon, translate }) => {
							return (
								<SidebarNavItem
									key={text}
									text={text}
									icon={icon}
									translate={translate}
								/>
							);
						})}
					</List>
				</Drawer>
			)}
		</Box>
	);
};

export default Sidebar;
