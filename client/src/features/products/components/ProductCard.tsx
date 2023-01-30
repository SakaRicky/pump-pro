import {
	Avatar,
	Box,
	Button,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Product } from "types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type ProductCardProps = {
	product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
	const theme = useTheme();

	// console.log("product: ", product);

	const handleQuantityChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		console.log("value: ", event.target.value);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);
	const handleCardOptionClick = (event: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<Box
			sx={{
				p: 2,
				boxShadow:
					"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
				maxWidth: "15rem",
				cursor: "pointer",
				position: "relative",
				backgroundColor: theme.palette.background.alt
			}}
		>
			<Box width="100%" height="7rem" mb="1.5rem">
				{product.image ? (
					<img
						style={{
							padding: "2px",
							border: `1px solid ${theme.palette.grey[600]}`,
							objectFit: "cover",
							width: "100%",
							height: "100%"
						}}
						src={product.image}
						alt="profile"
					/>
				) : (
					<Avatar
						variant="rounded"
						sx={{
							bgcolor: theme.palette.grey[600],
							width: "100%",
							height: "100%",
							padding: "2px",
							border: `1px solid ${theme.palette.grey[600]}`
						}}
						aria-label="product avatar"
					>
						<Typography fontSize="3rem">
							{product.name.split(" ")[0].toUpperCase()}
						</Typography>
					</Avatar>
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					textAlign: "center"
				}}
			>
				<Typography fontWeight="700" fontSize="1.2rem">
					{product.name}
				</Typography>
				<Typography fontWeight="700" fontSize="0.8rem">
					{product.description}
				</Typography>
				<Typography
					fontWeight="700"
					fontSize="1.5rem"
					color={theme.palette.primary[500]}
				>
					{product.selling_price} XAF
				</Typography>
			</Box>
			<Box m="1rem 0" sx={{ display: "flex", gap: "5px" }}>
				<TextField
					type="number"
					size="small"
					sx={{ width: "50%" }}
					onChange={handleQuantityChange}
				/>
				<Button
					fullWidth
					endIcon={<AddShoppingCartIcon />}
					sx={{
						backgroundColor: theme.palette.secondary.main,
						color: theme.palette.grey[50],

						"&:hover": {
							backgroundColor: theme.palette.secondary.dark
						}
					}}
				>
					<FormattedMessage
						id="product.card.addToCart"
						defaultMessage="Add To Chart"
					/>
				</Button>
			</Box>
		</Box>
	);
};

export default ProductCard;
