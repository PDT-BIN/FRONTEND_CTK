import { Box, Link, Typography } from "@mui/material";

export default function NotFound() {
	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#FAD961",
				backgroundImage:
					"linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)",
			}}
		>
			<Typography variant="h1" fontWeight="bold">
				PAGE NOT FOUND
			</Typography>

			<Link
				href="/login"
				underline="none"
				fontWeight="bold"
				sx={{ marginTop: "25px", fontSize: "large" }}
			>
				BACK TO LOGIN
			</Link>
		</Box>
	);
}
