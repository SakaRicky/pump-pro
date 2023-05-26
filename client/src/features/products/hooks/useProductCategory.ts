import { useQuery } from "@tanstack/react-query";
import { ProductCategory } from "types";
import {
	getProductCategories,
	getProductCategory
} from "services/productCategory";

export const UseProductCategories = () => {
	const query = useQuery<ProductCategory[], Error>({
		queryKey: ["productCategories"],
		queryFn: getProductCategories,
		initialData: []
	});

	return query;
};

export const UseProductCategory = (productCategoryId: string) => {
	const query = useQuery<ProductCategory | undefined, Error>({
		queryKey: ["productCategory", productCategoryId],
		queryFn: () => getProductCategory(productCategoryId),
		enabled: productCategoryId !== ""
	});

	return query;
};
