import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
	return (
		<Box
			sx={{
				display: "flex",
				position: "absolute",
				left: "0",
				top: "0",
				width: "100vw",
				height: "100vh",
				zIndex: Number.MAX_SAFE_INTEGER,
			}}
		>
			<CircularProgress
				color="success"
				sx={{
					margin: "auto",
					width: "175px",
					height: "175px",
				}}
			/>
		</Box>
	);
};

export default LoadingIndicator;
