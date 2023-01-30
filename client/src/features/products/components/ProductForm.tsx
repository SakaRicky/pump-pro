import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import TextInput from "components/inputs/TextInput";
import { PreviewImage } from "components/PrevieImage";
import { AuthError } from "errors/authError";
import { UserError } from "errors/userError";
import { Form, Formik } from "formik";
import { useNotify } from "hooks/useNotify";
import React, { forwardRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { saveProduct, updateProduct } from "services/products";
import { NewProduct, Product } from "types";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { UseProductCategories } from "../hooks/useProductCategory";
import CreatableSelectInput from "components/inputs/CreatableSelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";

type ProductFormProps = {
	product?: Product;
	handleCloseModal: () => void;
};

const ProductForm = forwardRef(
	({ product, handleCloseModal }: ProductFormProps, ref: any) => {
		const theme = useTheme();

		const queryClient = useQueryClient();

		const { data, isLoading, error, refetch } = UseProductCategories();

		const [loading, setLoading] = useState(false);
		const notify = useNotify();

		if (error) {
			notify("Category Error", error.message, "error");
		}

		const isEditMode = !!product;

		const navigate = useNavigate();

		const [picture, setPicture] = useState<File | null>(null);

		const initialValues: NewProduct = {
			name: isEditMode ? product.name : "",
			category_id: isEditMode ? product.category.id : "",
			description: isEditMode ? product.description : "",
			quantity: isEditMode ? product.quantity : 0,
			purchase_price: isEditMode ? product.purchase_price : 0,
			selling_price: isEditMode ? product.selling_price : 0,
			reorder_point: isEditMode ? product.reorder_point : 0
		};

		const createProductValidationSchema = yup.object({
			name: yup.string().required("Names is required"),
			category_id: yup.string().required("Categoryes is required"),
			description: yup.string(),
			quantity: yup.number().min(1, "You must give a quantity"),
			purchase_price: yup.number().min(1, "You must give a purchase price"),
			selling_price: yup.number().min(1, "You must give a selling price"),
			reorder_point: yup.number().min(1, "You must give a reorder point")
		});

		const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!e.target.files?.length) {
				return;
			}
			const uploadedPicture = e.target.files[0];
			setPicture(uploadedPicture);
			e.target.files = null;
		};

		const createProductMutation = useMutation({
			mutationFn: saveProduct,
			onSuccess: (data, variables, context: any) => {
				notify("Save Success", context.successMessage, "success");
				handleCloseModal();
				setLoading(false);
				queryClient.invalidateQueries(["products"], { exact: true });
			},
			onMutate: variables => {
				return { successMessage: "Created Product Successfully" };
			}
		});

		const onNewProductSubmit = async (data: NewProduct) => {
			setLoading(true);
			const formData = new FormData();

			for (const [key, value] of Object.entries(data)) {
				if (typeof value === "number") {
					formData.append(key, value.toString());
				} else {
					formData.append(key, value);
				}
			}
			if (picture) {
				formData.append("file", picture, picture?.name);
			}

			try {
				if (isEditMode) {
					formData.append("id", product.id);
					await updateProduct(formData);
					notify("Edit Success", "Product edited successfully", "success");
					handleCloseModal();
					setLoading(false);
				} else {
					await createProductMutation.mutateAsync(formData);
				}
			} catch (error) {
				if (error instanceof UserError) {
					notify("Login Error", error.message, "error");
				}
				if (error instanceof Error) {
					notify("Login Error", error.message, "error");
				}
				if (error instanceof AuthError) {
					notify("Login Error", error.message, "error");
					navigate("/login");
				}
				setLoading(false);
			}
		};

		return (
			<Box
				ref={ref}
				p={4}
				sx={{
					boxShadow:
						"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(4, 110, 174) 0px 0px 0px 3px",
					backgroundColor: theme.palette.background.alt,
					width: "60%",
					height: "80%",
					mt: "5rem",
					overflowY: "auto"
				}}
			>
				<Typography variant="h2" fontSize="2rem" mb="2rem" textAlign="center">
					<FormattedMessage
						id="form.worker.heading"
						defaultMessage={isEditMode ? "Edit Product" : "Add New Product"}
					/>
				</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={createProductValidationSchema}
					validate={() => ({})}
					onSubmit={values => {
						onNewProductSubmit(values);
					}}
				>
					<Form>
						<Grid
							container
							spacing={{ xs: 0, sm: 2, md: 3 }}
							rowSpacing={2}
							columns={12}
						>
							<Grid item xs={12} sm={6}>
								<TextInput type="text" label="Name" name="name" />
							</Grid>

							<Grid item xs={12} sm={6}>
								<CreatableSelectInput
									label="Category"
									name="category_id"
									refetch={refetch}
									options={data}
									isLoading={isLoading}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextInput type="number" label="Quantity" name="quantity" />
							</Grid>
							<Grid item xs={6} md={3}>
								<TextInput
									type="number"
									label="Purchase Price"
									name="purchase_price"
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextInput
									type="number"
									label="Selling Price"
									name="selling_price"
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextInput
									type="number"
									label="Reorder Point"
									name="reorder_point"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextInput
									type="text"
									label="Description"
									name="description"
									multiline
								/>
							</Grid>
						</Grid>

						<FlexBetween sx={{ mt: 4 }}>
							<Button
								variant="contained"
								component="label"
								sx={{ textTransform: "uppercase", fontWeight: 700 }}
							>
								<FormattedMessage
									id="upload.upload"
									defaultMessage="Upload Picture"
								/>
								<input type="file" hidden onChange={handleFileInputChange} />
							</Button>
							<Box
								sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
							>
								{picture && (
									<Box
										sx={{
											width: "10rem",
											height: "10rem"
										}}
									>
										<PreviewImage
											imageFile={picture}
											handleDeleteImage={() => setPicture(null)}
										/>
									</Box>
								)}
								{isEditMode && Boolean(product.image) && (
									<img
										style={{
											borderRadius: "50%",
											marginTop: "1rem",
											padding: "2px",
											border: `1px solid ${theme.palette.grey[600]}`,
											objectFit: "cover",
											width: "10rem",
											height: "10rem"
										}}
										src={product.image}
										alt="profile"
									/>
								)}
							</Box>
							<LoadingButton
								type="submit"
								loading={loading}
								endIcon={isEditMode ? <EditIcon /> : <AddIcon />}
								loadingPosition="end"
								sx={{
									backgroundColor: theme.palette.secondary.main,
									color: theme.palette.grey[50],

									"&:hover": {
										backgroundColor: theme.palette.secondary.dark
									}
								}}
							>
								{isEditMode ? "Save" : "Add Product"}
							</LoadingButton>
						</FlexBetween>
					</Form>
				</Formik>
			</Box>
		);
	}
);

export default ProductForm;
