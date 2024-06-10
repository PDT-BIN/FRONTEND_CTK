import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Button from "../../components/customs/Button";
import { dataEmployee } from "../../data";
import { MdAddBox } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import ConfirmDialog from "../../components/ConfirmDialog";
import AxiosInstance from "../../api/api";
import { DateTimeUtil } from "../../utils";
import ModifyModal from "./ModifyModal";

const Toolbar = (props) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<GridToolbarContainer style={{ padding: "10px 0" }}>
			<Button
				label="ADD RECORD"
				onClick={props.openCreateDialog}
				startIcon={<MdAddBox />}
				style={{ padding: "10px", color: colors.green[600] }}
			/>
			<Button
				label="EDIT RECORD"
				onClick={props.openModifyDialog}
				disabled={!props.openForUpdating}
				startIcon={<BiSolidEdit />}
				style={{ padding: "10px", color: colors.green[600] }}
			/>
			<Button
				label="DELETE RECORD"
				onClick={props.openDeleteDialog}
				disabled={!props.openForUpdating}
				startIcon={<FaDeleteLeft />}
				style={{ padding: "10px", color: colors.green[600] }}
			/>
		</GridToolbarContainer>
	);
};

export default function Employee() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// DATAGRID CONFIGURATION.
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5, hideable: false },
		{
			field: "fullName",
			headerName: "FULLNAME",
			flex: 1,
			hideable: false,
		},
		{
			field: "dateOfBirth",
			headerName: "DATE OF BIRTH",
			flex: 0.75,
			type: "date",
			valueGetter: (value) => DateTimeUtil.parse(value),
			valueFormatter: (value) => DateTimeUtil.format(value),
		},
		{
			field: "phoneNumber",
			headerName: "PHONE NUMBER",
			flex: 1,
			sortable: false,
		},
		{
			field: "address",
			headerName: "ADDRESS",
			flex: 1,
			sortable: false,
		},
	];
	const [rows, setRows] = useState(dataEmployee);
	const selectedRow = useRef({});
	const [selectedRowModel, setSelectedRowModel] = useState([]);
	// DIALOG SECTION.
	const openForUpdating = useMemo(
		() => Boolean(selectedRow.current.id),
		[selectedRow.current]
	);
	const [openModify, setOpenModify] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	// API.
	const { notify } = useContext(ColorModeContext);
	useEffect(() => {
		AxiosInstance.get("manage/employee")
			.then((response) => {
				const data = response.data;
				setRows(data.data);
				notify(data.message);
			})
			.catch((error) => {
				const data = error?.response?.data;
				notify(data?.message || error.message, "error");
			});
	}, [openModify, openDelete]);

	function handleFormCancel() {
		setSelectedRowModel([]);
		selectedRow.current = {};
	}

	function openCreateDialog() {
		selectedRow.current = {};
		setOpenModify(true);
	}

	function openModifyDialog() {
		setOpenModify(true);
	}

	function openDeleteDialog() {
		setOpenDelete(true);
	}

	function closeModifyDialog() {
		setOpenModify(false);
		handleFormCancel();
	}

	function closeDeleteDialog() {
		setOpenDelete(false);
		handleFormCancel();
	}

	// CALL API CREATE & UPDATE.
	function handleModifySubmit(contentValues, { setSubmitting }) {
		contentValues = {
			...contentValues,
			dateOfBirth: DateTimeUtil.format(
				contentValues["dateOfBirth"],
				false
			),
		};

		if (!openForUpdating) {
			AxiosInstance.post("manage/employee", contentValues)
				.then((response) => {
					const data = response.data;
					notify(data.message);
					closeModifyDialog();
				})
				.catch((error) => {
					const data = error?.response?.data;
					notify(data?.message || error.message, "error");
				});
		} else {
			AxiosInstance.put("manage/employee", contentValues)
				.then((response) => {
					const data = response.data;
					notify(data.message);
					closeModifyDialog();
				})
				.catch((error) => {
					const data = error?.response?.data;
					notify(data?.message || error.message, "error");
				});
		}
		setSubmitting(false);
	}

	// CALL API DELETE.
	function handleDeleteSubmit() {
		const PATH = `manage/employee?id=${selectedRow.current["id"]}`;
		AxiosInstance.delete(PATH)
			.then((response) => {
				const data = response.data;
				notify(data.message);
				closeDeleteDialog();
			})
			.catch((error) => {
				const data = error?.response?.data;
				notify(data?.message || error.message, "error");
			});
	}

	return (
		<Box m="0 25px">
			<Box
				width="100%"
				height="90vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none !important",
					},
					"& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-withBorderColor":
						{
							outline: "none !important",
						},
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: colors.blue[700],
					},
					"& .MuiDataGrid-topContainer::after": {
						content: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						color: "white",
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-cell": {
						border: "none !important",
					},
					"& .css-tgsonj": {
						border: "none !important",
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: colors.blue[700],
						border: "none !important",
						borderRadius: "0 0 4px 4px",
					},
					"& .MuiDataGrid-columnSeparator": {
						display: "none !important",
					},
				}}
			>
				<DataGrid
					columns={columns}
					rows={rows}
					rowHeight={60}
					autoHeight
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 7,
							},
						},
					}}
					pageSizeOptions={[7]}
					disableColumnResize
					slots={{ toolbar: Toolbar }}
					slotProps={{
						toolbar: {
							openCreateDialog,
							openModifyDialog,
							openDeleteDialog,
							openForUpdating,
						},
					}}
					rowSelectionModel={selectedRowModel}
					onRowSelectionModelChange={(params) => {
						if (selectedRowModel[0] === params[0]) {
							selectedRow.current = {};
							setSelectedRowModel([]);
						} else setSelectedRowModel(params);
					}}
					onRowClick={(params) => (selectedRow.current = params.row)}
				/>
			</Box>

			<ModifyModal
				isOpened={openModify}
				handleClose={closeModifyDialog}
				handleFormSubmit={handleModifySubmit}
				title="EMPLOYEE PROFILE"
				data={selectedRow.current}
			/>

			<ConfirmDialog
				isOpened={openDelete}
				handleClose={closeDeleteDialog}
				handleFormSubmit={handleDeleteSubmit}
			/>
		</Box>
	);
}
