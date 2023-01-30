import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "types";
import { getProduct, getProducts, saveProduct } from "services/products";

export const UseProducts = () => {
	const query = useQuery<Product[], Error>({
		queryKey: ["products"],
		queryFn: getProducts
	});

	return query;
};

export const UseProduct = (postId: string) => {
	const query = useQuery<Product, Error>({
		queryKey: ["product"],
		queryFn: () => getProduct(postId)
	});

	return query;
};

// export const FindingsUpdateMutator = (
// 	userToUpdate: User,
// 	query: UseQueryResult<User, Error>
// ) => {
// 	const mutator = useMutation(() => updateUser(userToUpdate), {
// 		onSuccess: data => {
// 			query.refetch();
// 		},
// 		onError: error => {
// 			alert(error);
// 			console.log("error when mutating: ", error);
// 		}
// 	});

// 	return mutator;
// };
