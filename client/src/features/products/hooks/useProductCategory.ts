import { useQuery } from "@tanstack/react-query";
import { ProductCategory } from "types";
import {
	getProductCategories,
	getProductCategory
} from "services/productCategory";

export const UseProductCategories = () => {
	const query = useQuery<ProductCategory[], Error>({
		queryKey: ["productCategories"],
		queryFn: getProductCategories
	});

	return query;
};

export const UseProductCategory = (productCategoryId: string) => {
	const query = useQuery<ProductCategory, Error>({
		queryKey: ["productCategory"],
		queryFn: () => getProductCategory(productCategoryId)
	});

	return query;
};
