import { Box, Button, Grid, Modal, useTheme } from "@mui/material";
import { useNotify } from "hooks/useNotify";
import React, { useState, useEffect, useCallback } from "react";
import { deleteUser, getUsers } from "services/users";
import { User } from "types";
import WorkerCard from "features/workers/components/WorkerCard";
import AddIcon from "@mui/icons-material/Add";
import withAuth from "hoc/withAuth";
import WorkerForm from "features/workers/components/WorkerForm";
import WorkerInfoPage from "features/workers/components/WorkerInfoPage";

const Workers = () => {
	const theme = useTheme();

	const [workers, setWorkers] = useState<User[]>([]);
	const [workerToEdit, setWorkerToEdit] = useState<User>();
	const [workerToView, setWorkerToView] = useState<User>();

	const [modalOpen, setModalOpen] = React.useState(false);
	const handleCloseModal = () => {
		setModalOpen(false);
		setWorkerToEdit(undefined);
	};

	const [infoModalOpen, setInfoModalOpen] = React.useState(false);
	const handleInfoCloseModal = () => {
		console.log("close modal");

		setInfoModalOpen(false);
		setWorkerToView(undefined);
	};

	const handleEditWorker = (worker: User) => {
		setWorkerToEdit(worker);
		setModalOpen(true);
	};

	const handleViewWorkerInfo = (worker: User) => {
		setWorkerToView(worker);
		setInfoModalOpen(true);
	};

	const handleDeleteWorker = async (workerId: string) => {
		try {
			await deleteUser(workerId);
			notify("Delete Success", "User deleted successfully", "success");
			fetchUsers();
		} catch (error: any) {
			notify("Login Error", error.message, "error");
		}
	};

	const notify = useNotify();

	const fetchUsers = useCallback(async () => {
		try {
			const users = await getUsers();
			if (users) {
				setWorkers(users);
			}
		} catch (error) {
			if (error instanceof Error) {
				notify("Error", error.message, "error");
			}
		}
	}, [notify]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers, modalOpen]);

	return (
		<Box p="2rem">
			<Modal
				open={modalOpen}
				onClose={handleCloseModal}
				aria-labelledby="Worker Form"
				aria-describedby="Form used to add or edit worker"
				sx={{
					display: "flex",
					justifyContent: "center"
				}}
			>
				<>
					<WorkerForm
						worker={workerToEdit}
						handleCloseModal={handleCloseModal}
					/>
				</>
			</Modal>
			<Modal
				open={infoModalOpen}
				onClose={handleInfoCloseModal}
				aria-labelledby="Worker Info Page"
				aria-describedby="Page to view worker Info"
				sx={{
					display: "flex",
					justifyContent: "center"
				}}
			>
				<>
					<WorkerInfoPage worker={workerToView} />
				</>
			</Modal>

			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					endIcon={<AddIcon />}
					sx={{
						backgroundColor: theme.palette.secondary.main,
						color: theme.palette.grey[50],

						"&:hover": {
							backgroundColor: theme.palette.secondary.dark
						}
					}}
					onClick={() => setModalOpen(true)}
				>
					Add Worker
				</Button>
			</Box>
			<Box mt="2rem">
				<Grid
					container
					spacing={{ xs: 0, sm: 2, md: 3 }}
					rowSpacing={4}
					columns={12}
				>
					{workers.map(worker => (
						<Grid item xs={12} sm={6} md={4} key={worker.id}>
							<WorkerCard
								worker={worker}
								handleEditWorker={handleEditWorker}
								handleDeleteWorker={handleDeleteWorker}
								handleViewWorkerInfo={handleViewWorkerInfo}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default withAuth(Workers);
