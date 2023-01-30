import { ProductCategory } from "@prisma/client";

export const getProducts = (categories: ProductCategory[]) => {
	return [
		{
			name: "Mambo PM 25g",
			description: "Chocolate thin bar of 25g",
			quantity: 75,
			purchase_price: 150,
			selling_price: 175,
			reorder_point: 25,
			category_id: categories[1].id,
			image: "http://localhost:5001/images/products/mambo.webp"
		},
		{
			name: "Guiness PM 30CL",
			description: "Guiness petit model",
			quantity: 110,
			purchase_price: 600,
			selling_price: 650,
			reorder_point: 24,
			category_id: categories[2].id,
			image: "http://localhost:5001/images/products/guiness.jpeg"
		},
		{
			name: "Guiness GM 30CL",
			description: "Guiness Grand model",
			quantity: 130,
			purchase_price: 900,
			selling_price: 1000,
			reorder_point: 35,
			category_id: categories[3].id
		},
		{
			name: "Djino Cocktail 1L",
			description: "Djino Cocktail 1 liter",
			quantity: 40,
			purchase_price: 500,
			selling_price: 600,
			reorder_point: 8,
			category_id: categories[0].id
		},
		{
			name: "Jadida 450g",
			description: "Jadida 450g butter",
			quantity: 20,
			purchase_price: 400,
			selling_price: 500,
			reorder_point: 5,
			category_id: categories[6].id
		},
		{
			name: "Papier Hygenique SITA",
			description: "Sita toilette roll",
			quantity: 40,
			purchase_price: 200,
			selling_price: 300,
			reorder_point: 10,
			category_id: categories[5].id,
			image: "http://localhost:5001/images/products/sita.webp"
		},
		{
			name: "Dolait (Boite)",
			description: "Dolait boite standar",
			quantity: 60,
			purchase_price: 385,
			selling_price: 400,
			reorder_point: 15,
			category_id: categories[4].id
		},
		{
			name: "Dolait 150g",
			description: "Djino Cocktail 1 liter",
			quantity: 40,
			purchase_price: 250,
			selling_price: 400,
			reorder_point: 10,
			category_id: categories[3].id
		},
		{
			name: "Peak",
			description: "Peak milk",
			quantity: 40,
			purchase_price: 450,
			selling_price: 500,
			reorder_point: 8,
			category_id: categories[1].id
		},
		{
			name: "Vin Rouge JOLIMET",
			description: "Vin Rouge JOLIMET",
			quantity: 10,
			purchase_price: 2166,
			selling_price: 2500,
			reorder_point: 2,
			category_id: categories[2].id,
			image: "http://localhost:5001/images/products/jolimet.jpeg"
		},
		{
			name: "Mambo PM 25g New",
			description: "Chocolate thin bar of 25g NEW",
			quantity: 75,
			purchase_price: 150,
			selling_price: 175,
			reorder_point: 25,
			category_id: categories[1].id,
			image: "http://localhost:5001/images/products/mambo.webp"
		},
		{
			name: "Guiness PM 30CL New",
			description: "Guiness petit model NEW",
			quantity: 110,
			purchase_price: 600,
			selling_price: 650,
			reorder_point: 24,
			category_id: categories[2].id,
			image: "http://localhost:5001/images/products/guiness.jpeg"
		},
		{
			name: "Guiness GM 30CL New",
			description: "Guiness Grand model NEW",
			quantity: 130,
			purchase_price: 900,
			selling_price: 1000,
			reorder_point: 35,
			category_id: categories[3].id
		},
		{
			name: "Djino Cocktail 1L New",
			description: "Djino Cocktail 1 liter NEW",
			quantity: 40,
			purchase_price: 500,
			selling_price: 600,
			reorder_point: 8,
			category_id: categories[0].id
		},
		{
			name: "Jadida 450g New",
			description: "Jadida 450g butter NEW",
			quantity: 20,
			purchase_price: 400,
			selling_price: 500,
			reorder_point: 5,
			category_id: categories[6].id
		},
		{
			name: "Papier Hygenique SITA New",
			description: "Sita toilette roll NEW",
			quantity: 40,
			purchase_price: 200,
			selling_price: 300,
			reorder_point: 10,
			category_id: categories[5].id
		},
		{
			name: "Dolait (Boite) New",
			description: "Dolait boite standar NEW",
			quantity: 60,
			purchase_price: 385,
			selling_price: 400,
			reorder_point: 15,
			category_id: categories[4].id
		},
		{
			name: "Dolait 150g New",
			description: "Djino Cocktail 1 liter NEW",
			quantity: 40,
			purchase_price: 250,
			selling_price: 400,
			reorder_point: 10,
			category_id: categories[3].id
		},
		{
			name: "Peak New",
			description: "Peak milk NEW",
			quantity: 40,
			purchase_price: 450,
			selling_price: 500,
			reorder_point: 8,
			category_id: categories[1].id
		},
		{
			name: "Vin Rouge JOLIMET New",
			description: "Vin Rouge JOLIMET NEW",
			quantity: 10,
			purchase_price: 2166,
			selling_price: 2500,
			reorder_point: 2,
			category_id: categories[2].id,
			image: "http://localhost:5001/images/products/jolimet.jpeg"
		},
		{
			name: "Mambo PM 25g NEW NEW",
			description: "Chocolate thin bar of 25g NEW NEW",
			quantity: 75,
			purchase_price: 150,
			selling_price: 175,
			reorder_point: 25,
			category_id: categories[1].id,
			image: "http://localhost:5001/images/products/mambo.webp"
		},
		{
			name: "Guiness PM 30CL NEW NEW",
			description: "Guiness petit model NEW NEW",
			quantity: 110,
			purchase_price: 600,
			selling_price: 650,
			reorder_point: 24,
			category_id: categories[2].id,
			image: "http://localhost:5001/images/products/guiness.jpeg"
		},
		{
			name: "Guiness GM 30CL NEW NEW",
			description: "Guiness Grand model NEW NEW",
			quantity: 130,
			purchase_price: 900,
			selling_price: 1000,
			reorder_point: 35,
			category_id: categories[3].id
		},
		{
			name: "Djino Cocktail 1L NEW NEW",
			description: "Djino Cocktail 1 liter NEW NEW",
			quantity: 40,
			purchase_price: 500,
			selling_price: 600,
			reorder_point: 8,
			category_id: categories[0].id
		},
		{
			name: "Jadida 450g NEW NEW",
			description: "Jadida 450g butter NEW NEW",
			quantity: 20,
			purchase_price: 400,
			selling_price: 500,
			reorder_point: 5,
			category_id: categories[6].id
		},
		{
			name: "Papier Hygenique SITA NEW NEW",
			description: "Sita toilette roll NEW NEW",
			quantity: 40,
			purchase_price: 200,
			selling_price: 300,
			reorder_point: 10,
			category_id: categories[5].id
		},
		{
			name: "Dolait (Boite) NEW NEW",
			description: "Dolait boite standar NEW NEW",
			quantity: 60,
			purchase_price: 385,
			selling_price: 400,
			reorder_point: 15,
			category_id: categories[4].id
		},
		{
			name: "Dolait 150g NEW NEW",
			description: "Djino Cocktail 1 liter NEW NEW",
			quantity: 40,
			purchase_price: 250,
			selling_price: 400,
			reorder_point: 10,
			category_id: categories[3].id
		},
		{
			name: "Peak NEW NEW",
			description: "Peak milk NEW NEW",
			quantity: 40,
			purchase_price: 450,
			selling_price: 500,
			reorder_point: 8,
			category_id: categories[1].id
		},
		{
			name: "Vin Rouge JOLIMET NEW NEW",
			description: "Vin Rouge JOLIMET NEW NEW",
			quantity: 10,
			purchase_price: 2166,
			selling_price: 2500,
			reorder_point: 2,
			category_id: categories[2].id,
			image: "http://localhost:5001/images/products/jolimet.jpeg"
		}
	];
};
