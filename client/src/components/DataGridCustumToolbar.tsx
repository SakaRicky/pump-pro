import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport
} from "@mui/x-data-grid";
import React from "react";
import FlexBetween from "./FlexBetween";

type DataGridCustomToolbarProp = {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const DataGridCustomToolbar = ({
	search,
	setSearch
}: DataGridCustomToolbarProp) => {
	return (
		<GridToolbarContainer>
			<FlexBetween width="100%">
				<FlexBetween>
					<GridToolbarColumnsButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</FlexBetween>
				<TextField
					label="Search..."
					variant="standard"
					sx={{ mb: "0.5rem", width: "15rem" }}
					onChange={e => setSearch(e.target.value)}
					value={search}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton>
									<Search />
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</FlexBetween>
		</GridToolbarContainer>
	);
};

export default DataGridCustomToolbar;
