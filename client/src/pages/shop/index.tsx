import { Box, Grid } from "@mui/material";
import ProductCard from "features/products/components/ProductCard";
import { UseProducts } from "features/products/hooks/useProducts";
import React, { useState } from "react";

const Shop = () => {
	const { data, isLoading, error, refetch } = UseProducts();

	return (
		<Box p="2rem">
			<Grid
				container
				spacing={{ xs: 0, sm: 2, md: 3 }}
				rowSpacing={4}
				columns={12}
			>
				{data?.map(product => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Shop;
