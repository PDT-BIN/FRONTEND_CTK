import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { GridToolbarContainer } from "@mui/x-data-grid";
import Button from "./customs/Button";
import { MdAddBox } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Toolbar(props) {
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
}
