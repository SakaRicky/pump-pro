import React, { useState } from "react";
import { useStateValue } from "state";
import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	useMediaQuery
} from "@mui/material";
import ShoppingCart from "features/shopping/components/shoppingCart/ShoppingCart";
import ProductCard from "features/products/components/ProductCard";
import { useProducts } from "features/products/hooks/useProducts";
import withAuth from "hoc/withAuth";
import { useNotify } from "hooks/useNotify";
import { Cancel } from "@mui/icons-material";

const Shop = () => {
	const [state, dispatch] = useStateValue();
	const { data, isLoading, error, refetch } = useProducts();

	const isNonMobileTablet = useMediaQuery("(min-width: 600px)");

	const [searchedProduct, setSearchedProduct] = useState("");

	const notify = useNotify();

	if (error) {
		notify("Error Fetching Products", error.message, "error");
	}

	const filteredProducts =
		searchedProduct.length > 0
			? data?.filter(product =>
					product.name
						.toLocaleLowerCase()
						.includes(searchedProduct.toLocaleLowerCase())
			  )
			: data;

	return (
		<Box sx={{ position: "relative" }}>
			<TextField
				label="Search..."
				variant="standard"
				sx={{
					mb: "0.5rem",
					width: isNonMobileTablet ? "30%" : "80%",
					position: "absolute",
					top: "1rem",
					right: "5%"
				}}
				onChange={e => setSearchedProduct(e.target.value)}
				value={searchedProduct}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setSearchedProduct("")}>
								<Cancel />
							</IconButton>
						</InputAdornment>
					)
				}}
			/>

			<Box
				sx={{
					p: "2rem",
					pt: "8rem",
					mr: state.cartItems.length > 0 ? "30%" : 0
				}}
			>
				{isLoading ? (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<CircularProgress size={50} />
					</Box>
				) : (
					<Grid
						container
						spacing={{ xs: 0, sm: 2, md: 3 }}
						rowSpacing={4}
						columns={12}
					>
						{filteredProducts?.map(product => (
							<Grid item xs={12} sm={6} md={4} key={product.id}>
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>
				)}
				{state.cartItems.length > 0 ? (
					<Box
						sx={{
							width: "30%",
							height: "80%",
							position: "fixed",
							top: "15%",
							right: "3%",
							overflowY: "auto"
						}}
					>
						<ShoppingCart />
					</Box>
				) : null}
			</Box>
		</Box>
	);
};

export default withAuth(Shop);
