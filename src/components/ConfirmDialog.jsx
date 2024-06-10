import { DialogActions } from "@mui/material";
import Button from "./customs/Button";
import Dialog from "./customs/Dialog";

function ConfirmDialog(props) {
	return (
		<Dialog
			isOpened={props.isOpened}
			handleClose={props.handleClose}
			title="DELETE CONFIRMATION"
			style={{ width: "30%" }}
		>
			<DialogActions sx={{ justifyContent: "center", gap: "20px" }}>
				<Button
					label="DELETE"
					color="error"
					variant="contained"
					onClick={props.handleFormSubmit}
					style={{
						width: "30%",
						padding: "10px",
						color: "white",
					}}
				/>
				<Button
					label="CANCEL"
					color="warning"
					variant="contained"
					onClick={props.handleClose}
					style={{
						width: "30%",
						padding: "10px",
						color: "white",
					}}
				/>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
