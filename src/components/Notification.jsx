import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export let controlNotify;

export default function Notification() {
	const EMPTY_NOTICE = {
		open: false,
		message: "",
		severity: "",
	};
	const [props, setProps] = useState(EMPTY_NOTICE);
	const closeDialog = () => setProps(EMPTY_NOTICE);
	controlNotify = setProps;

	return (
		<Snackbar
			open={props.open}
			onClose={closeDialog}
			autoHideDuration={3000}
			sx={{
				position: "absolute !important",
				left: "auto !important",
				top: "25px !important",
				right: "25px !important",
				bottom: "auto !important",
			}}
		>
			<Alert
				severity={props.severity}
				onClose={closeDialog}
				sx={{
					minWidth: "350px",
					position: "relative",
					fontStyle: "italic",
					backgroundColor: "background.paper",
				}}
			>
				{props.message}
			</Alert>
		</Snackbar>
	);
}
