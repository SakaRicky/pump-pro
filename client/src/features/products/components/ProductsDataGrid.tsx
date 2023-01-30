import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustumToolbar";
import React, { useState } from "react";
import { Product } from "types";

type ProductsDataGridProps = {
	isLoading: boolean;
	rows: Product[] | undefined;
	columns: GridColDef<any, any, any>[];
	handleSelected?: (ids: GridSelectionModel) => void;
};

const ProductsDataGrid = ({
	isLoading,
	rows,
	columns,
	handleSelected
}: ProductsDataGridProps) => {
	const theme = useTheme();

	const [search, setSearch] = useState("");

	const filteredRows =
		search.length > 0
			? rows?.filter(
					product =>
						product.name
							.toLocaleLowerCase()
							.includes(search.toLocaleLowerCase()) ||
						product.description
							?.toLocaleLowerCase()
							.includes(search.toLocaleLowerCase())
			  )
			: rows;

	return (
		<Box
			mt="1rem"
			height="75vh"
			sx={{
				"& .MuiDataGrid-root": {
					border: `4px solid ${theme.palette.secondary.main}`
				},
				"& .MuiDataGrid-columnHeaders": {
					backgroundColor: theme.palette.background.alt,
					color: theme.palette.secondary[200],
					borderBottom: "none"
				},
				"& .MuiDataGrid-footerContainer": {
					backgroundColor: theme.palette.background.alt,
					color: theme.palette.secondary[200],
					borderBottom: "none"
				},
				"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
					color: `${theme.palette.secondary[100]} !important`
				}
			}}
		>
			<DataGrid
				loading={isLoading}
				rows={filteredRows || []}
				columns={columns}
				checkboxSelection={true}
				rowCount={(filteredRows && filteredRows.length) || 0}
				pagination
				rowsPerPageOptions={[20, 50, 100]}
				components={{ Toolbar: DataGridCustomToolbar }}
				componentsProps={{
					toolbar: { search, setSearch }
				}}
				onSelectionModelChange={ids => {
					handleSelected && handleSelected(ids);
				}}
			/>
		</Box>
	);
};

export default ProductsDataGrid;
