import { useQuery } from "@tanstack/react-query";
import { Fuel } from "types";
import { getFuel, getFuels } from "services/fuel";

export const UseFuels = () => {
	const query = useQuery<Fuel[], Error>({
		queryKey: ["fuels"],
		queryFn: () => getFuels()
	});

	return query;
};

export const UseFuel = (fuelID: string) => {
	const query = useQuery<Fuel, Error>({
		queryKey: ["fuel"],
		queryFn: () => getFuel(fuelID),
		enabled: fuelID !== ""
	});

	return query;
};
