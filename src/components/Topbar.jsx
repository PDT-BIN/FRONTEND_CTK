import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../theme";
import { IoNotifications } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";

export default function Topbar() {
	const navigate = useNavigate();
	const theme = useTheme();
	const { colorMode, notify } = useContext(ColorModeContext);

	function logout() {
		localStorage.clear();
		notify("Logout successfully!", "success");
		navigate("/login");
	}

	return (
		<Box
			sx={{
				height: "10%",
				padding: "10px",
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
				boxSizing: "border-box",
				"& .MuiIconButton-root": {
					":hover": {
						backgroundColor: "transparent",
					},
				},
			}}
		>
			<Box sx={{ display: "flex", gap: "10px" }}>
				{/* COLOR MODE */}
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "dark" ? (
						<MdDarkMode />
					) : (
						<MdLightMode />
					)}
				</IconButton>
				{/* NOTIFICATION */}
				<IconButton>
					<IoNotifications />
				</IconButton>
				{/* LOGOUT */}
				<IconButton onClick={logout}>
					<FaPowerOff />
				</IconButton>
			</Box>
		</Box>
	);
}
