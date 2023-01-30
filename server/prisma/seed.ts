/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import { getProducts } from "./products";

const prisma = new PrismaClient();

const productCategories = [
	{ name: "Bottle biere", description: "Biere being sold in bottles" },
	{ name: "Can biere", description: "Biere being sold in cans" },
	{
		name: "Sweet bottle drinks",
		description: "Sweet drinks being sold in bottles"
	},
	{ name: "Sweet bottle cans", description: "Sweet drinks being sold in cans" },
	{ name: "Mineral Water bottle", description: "Mineral water sold in bottle" },
	{ name: "Mineral Water sachet", description: "Mineral water sold in sachet" },
	{ name: "Tinned cans", description: "Food items in tinned cans" }
];

async function seed() {
	await prisma.sale.deleteMany();
	await prisma.saleDetail.deleteMany();
	await prisma.product.deleteMany();
	await prisma.user.deleteMany();
	await prisma.dailySale.deleteMany();
	await prisma.petrolSale.deleteMany();
	await prisma.productCategory.deleteMany();

	// CREATING USERS
	await prisma.user.create({
		data: {
			names: "John Doe",
			username: "johndoe",
			gender: "MALE",
			phone: "237123456789",
			godfather_phone: "237253142542",
			date_of_birth: new Date(2000, 0o2, 15),
			salary: 80000,
			CNI_number: "1234567890",
			email: "johndoe@gmail.com",
			password_hash:
				"$2a$12$TCL9gaFusbLlVRk.o47Z6.u13X/EmQlZFARCBC9ZOehLVo050QOje",
			role: "ADMIN"
		}
	});

	const user2 = await prisma.user.create({
		data: {
			names: "Neymar Junior",
			username: "neymarjunior",
			gender: "MALE",
			phone: "237213452642",
			date_of_birth: "1995-09-25T00:00:00.000Z",
			salary: 85000,
			godfather_phone: "237253142542",
			localisation: "Yassa",
			CNI_number: "0024585",
			password_hash:
				"$2a$12$TCL9gaFusbLlVRk.o47Z6.u13X/EmQlZFARCBC9ZOehLVo050QOje",
			profile_picture:
				"https://images.unsplash.com/photo-1596077058573-d3d8281a190f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
			role: "SALE"
		}
	});

	await prisma.user.create({
		data: {
			names: "Kim Kard",
			username: "kimkard",
			gender: "FEMALE",
			phone: "23798685745",
			date_of_birth: "1989-12-05T00:00:00.000Z",
			salary: 75000,
			CNI_number: "1234567890",
			godfather_phone: "237253142542",
			localisation: "Ndogbong",
			email: "kimkard@hotmail.com",
			role: "PUMPIST"
		}
	});

	const user4 = await prisma.user.create({
		data: {
			names: "Mary Takam",
			username: "takammary",
			gender: "FEMALE",
			phone: "237776699885",
			salary: 70000,
			date_of_birth: new Date(2002, 0o7, 19),
			godfather_phone: "23789658965",
			localisation: "Bonaberi",
			CNI_number: "13254",
			password_hash:
				"$2a$12$TCL9gaFusbLlVRk.o47Z6.u13X/EmQlZFARCBC9ZOehLVo050QOje",
			profile_picture:
				"https://plus.unsplash.com/premium_photo-1661597221998-24a4fc0b730a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
			role: "SALE"
		}
	});

	// CREATING CATEGORIES

	await prisma.productCategory.createMany({
		data: productCategories
	});

	const categories = await prisma.productCategory.findMany();

	await prisma.product.createMany({ data: getProducts(categories) });

	const savedProducts = await prisma.product.findMany();
	const product1 = savedProducts[0];
	const product2 = savedProducts[1];
	const product3 = savedProducts[2];

	const product4 = savedProducts[3];
	const product5 = savedProducts[4];
	const product6 = savedProducts[5];
	const product7 = savedProducts[6];
	const product8 = savedProducts[7];

	await prisma.sale.create({
		data: {
			user_id: user2.id,
			total_amount:
				product1.selling_price * 2 +
				product2.selling_price * 1 +
				product3.selling_price * 14,
			saleDetails: {
				createMany: {
					data: [
						{
							product_id: product1.id,
							unit_price: product1.selling_price,
							quantity: 2,
							total_amount: product1.selling_price * 2
						},
						{
							product_id: product2.id,
							unit_price: product2.selling_price,
							quantity: 1,
							total_amount: product2.selling_price * 1
						},
						{
							product_id: product3.id,
							unit_price: product3.selling_price,
							quantity: 14,
							total_amount: product3.selling_price * 14
						}
					]
				}
			}
		}
	});

	await prisma.sale.create({
		data: {
			user_id: user4.id,
			total_amount:
				product4.selling_price * 4 +
				product5.selling_price * 7 +
				product7.selling_price * 6 +
				product8.selling_price * 1,
			saleDetails: {
				createMany: {
					data: [
						{
							product_id: product4.id,
							unit_price: product4.selling_price,
							quantity: 4,
							total_amount: product4.selling_price * 4
						},
						{
							product_id: product5.id,
							unit_price: product5.selling_price,
							quantity: 7,
							total_amount: product5.selling_price * 7
						},
						{
							product_id: product6.id,
							unit_price: product6.selling_price,
							quantity: 2,
							total_amount: product6.selling_price * 2
						},
						{
							product_id: product7.id,
							unit_price: product7.selling_price,
							quantity: 6,
							total_amount: product7.selling_price * 6
						},
						{
							product_id: product8.id,
							unit_price: product8.selling_price,
							quantity: 1,
							total_amount: product8.selling_price * 1
						}
					]
				}
			}
		}
	});

	const expextedUser1Amount =
		product1.selling_price * 2 +
		product2.selling_price * 1 +
		product3.selling_price * 14;

	const amountGivenUser1 =
		product1.selling_price * 2 + product3.selling_price * 14;

	const diff = amountGivenUser1 - expextedUser1Amount;

	await prisma.dailySale.createMany({
		data: [
			{
				user_id: user2.id,
				expected_amount: expextedUser1Amount,
				amount_given: amountGivenUser1,
				difference: diff
			}
		]
	});

	const expextedAmountUser2 =
		product4.selling_price * 4 +
		product5.selling_price * 7 +
		product7.selling_price * 6 +
		product8.selling_price * 1;

	const amountGivenUser2 =
		product4.selling_price * 4 +
		product5.selling_price * 7 +
		product7.selling_price * 6 +
		product8.selling_price * 1;

	const diff2 = amountGivenUser2 - expextedAmountUser2;

	await prisma.dailySale.createMany({
		data: [
			{
				user_id: user4.id,
				expected_amount: expextedAmountUser2,
				amount_given: amountGivenUser2,
				difference: diff2
			}
		]
	});
}

// const seed_test = () => {

// }

// void process.env.NODE_ENV === "test" ? seed_test() : seed();
void seed();
