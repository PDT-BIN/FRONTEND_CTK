import { useContext, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { dataJourney, dataCoach, dataDriver } from "../../data";
import ConfirmDialog from "../../components/ConfirmDialog";
import AxiosInstance from "../../api/api";
import { DateTimeUtil } from "../../utils";
import ModifyModal from "./ModifyModal";
import { MdAddBox } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import Button from "../../components/customs/Button";
import getTokenItem from "../../api/token";

function Toolbar(props) {
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
				label="DELETE RECORD"
				onClick={props.openDeleteDialog}
				disabled={!Boolean(props.selectedRow.current.id)}
				startIcon={<FaDeleteLeft />}
				style={{ padding: "10px", color: colors.green[600] }}
			/>
		</GridToolbarContainer>
	);
}

export default function Journey() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// DATAGRID CONFIGURATION.
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.75, hideable: false },
		{
			field: "bus",
			headerName: "COACH",
			flex: 0.75,
			hideable: false,
			valueGetter: (value) => value.licensePlate,
		},
		{
			field: "departureDate",
			headerName: "DEPARTURE TIME",
			flex: 1,
			type: "dateTime",
			valueGetter: (value, row) =>
				DateTimeUtil.parse(`${value} ${row.departureTime}`, true, true),
			valueFormatter: (value) => DateTimeUtil.format(value, true, true),
		},
		{
			field: "departureProvince",
			headerName: "DEPARTURE PLACE",
			flex: 1,
			valueGetter: (value, row) => `${value} - ${row.destProvince}`,
		},
		{
			field: "estimatedTime",
			headerName: "DURATION (H)",
			flex: 0.75,
			type: "number",
		},
		{
			field: "price",
			headerName: "PRICE (VNĐ)",
			flex: 0.75,
			type: "number",
		},
	];
	const [rows, setRows] = useState(dataJourney);
	const selectedRow = useRef({});
	const [selectedRowModel, setSelectedRowModel] = useState([]);
	// DIALOG SECTION.
	const [openModify, setOpenModify] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	// USER INFORMATION.
	const EMPLOYEE_ID = getTokenItem("EMPLOYEE_ID");
	// API.
	const { notify } = useContext(ColorModeContext);
	const [coaches, setCoaches] = useState(dataCoach);
	const [drivers, setDrivers] = useState(dataDriver);
	const [provinces, setProvinces] = useState([]);
	useEffect(() => {
		AxiosInstance.get("manage/buses")
			.then((response) => {
				const data = response.data;
				setCoaches(data.data);
			})
			.catch((error) => {
				const data = error?.response?.data;
				notify(data?.message || error.message, "error");
			});
		AxiosInstance.get("manage/drivers")
			.then((response) => {
				const data = response.data;
				setDrivers(data.data);
			})
			.catch((error) => {
				const data = error?.response?.data;
				notify(data?.message || error.message, "error");
			});
		AxiosInstance.get("manage/provinces")
			.then((response) => {
				const data = response.data;
				setProvinces(data.data);
			})
			.catch((error) => {
				const data = error?.response?.data;
				notify(data?.message || error.message, "error");
			});
	}, []);
	useEffect(() => {
		AxiosInstance.get("manage/journeys")
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

	// CALL API CREATE.
	function handleModifySubmit(contentValues, { setSubmitting }) {
		contentValues = {
			...contentValues,
			departureDate: DateTimeUtil.format(
				contentValues["departureDate"],
				false
			),
			departureTime: DateTimeUtil.format(
				contentValues["departureTime"],
				false,
				false,
				"HH:mm"
			),
			employeeId: EMPLOYEE_ID,
		};
		console.log(contentValues);

		AxiosInstance.post("manage/journey", contentValues)
			.then((response) => {
				const data = response.data;
				notify(data.message);
				closeModifyDialog();
			})
			.catch((error) => {
				const data = error?.response?.data;
				notify(data?.message || error.message, "error");
			});
		setSubmitting(false);
	}

	// CALL API DELETE.
	function handleDeleteSubmit() {
		const PATH = `manage/journey?id=${selectedRow.current["id"]}`;
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
							selectedRow,
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
				title="JOURNEY PROFILE"
				data={{
					coaches: coaches,
					drivers: drivers,
					provinces: provinces,
				}}
			/>

			<ConfirmDialog
				isOpened={openDelete}
				handleClose={closeDeleteDialog}
				handleFormSubmit={handleDeleteSubmit}
			/>
		</Box>
	);
}
