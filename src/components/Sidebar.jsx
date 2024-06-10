import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarClasses } from "react-pro-sidebar";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoBus } from "react-icons/io5";
import {
	FaPersonMilitaryPointing,
	FaRoute,
	FaUserShield,
} from "react-icons/fa6";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { Box, Divider, Typography } from "@mui/material";
import { URL_TO_TAB } from "../constants";
import getTokenItem from "../api/token";

function MenuIcon({ state, setState }) {
	return (
		<MenuItem
			onClick={() => setState(!state)}
			icon={
				state ? <BsArrowRightSquareFill /> : <BsArrowLeftSquareFill />
			}
			rootStyles={{
				display: "flex",
				flexDirection: !state && "row-reverse",
				":hover": { backgroundColor: "transparent" },
				"& .ps-menu-button": {
					backgroundColor: "transparent !important",
				},
			}}
		/>
	);
}

function Item({ title, icon, selected, setSelected }) {
	const link = `/${title === "Employee" ? "" : title.toLowerCase()}`;

	return (
		<MenuItem
			icon={icon}
			active={selected === title}
			component={<Link to={link} />}
			onClick={() => setSelected(title)}
		>
			{title.toUpperCase()}
		</MenuItem>
	);
}

export default function Sidebar() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// CONTROL SIDEBAR.
	const location = useLocation();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState(URL_TO_TAB[location.pathname]);
	// USER INFORMATION.
	const FULLNAME = getTokenItem("FULLNAME");
	const ROLE_NAME = getTokenItem("ROLE_NAME");

	// API GET PERSONAL INFORMATION.
	useEffect(() => {}, []);

	return (
		<ProSidebar
			width="20%"
			collapsed={isCollapsed}
			rootStyles={{
				[`.${sidebarClasses.container}`]: {
					backgroundColor: colors.primary[400],
				},
			}}
		>
			<Menu
				menuItemStyles={{
					icon: { fontSize: "24px" },
					button: ({ active }) => {
						return {
							color: colors.grey[700],
							letterSpacing: 1.5,
							padding: "30px 20px",
							backgroundColor: active && "#6870fa",
							":hover": { color: "#868dfb", opacity: 0.25 },
						};
					},
				}}
			>
				{/* TOGGLE BUTTON */}
				<MenuIcon state={isCollapsed} setState={setIsCollapsed} />
				{!isCollapsed && (
					<Box mb="15px">
						{/* AVATAR */}
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<MdAdminPanelSettings
								color={colors.blue[500]}
								fontSize="120px"
							/>
						</Box>
						{/* NAME & ROLE */}
						<Box textAlign="center">
							<Typography
								variant="h3"
								color={colors.grey[700]}
								fontWeight="bold"
								sx={{ m: "10px 0" }}
							>
								{FULLNAME}
							</Typography>
							<Typography
								variant="h5"
								color={colors.green[500]}
								letterSpacing={1.25}
							>
								{ROLE_NAME}
							</Typography>
						</Box>
					</Box>
				)}
				{/* DASHBOARD */}
				{/* <Item
					title="Dashboard"
					icon={<RxDashboard />}
					selected={selected}
					setSelected={setSelected}
				/> */}
				{/* DIVIDER */}
				{/* <Divider style={{ margin: "10px 0" }} /> */}
				{/* INFORMATION */}
				<Item
					title="Employee"
					icon={<FaUserShield />}
					selected={selected}
					setSelected={setSelected}
				/>
				<Item
					title="Driver"
					icon={<FaPersonMilitaryPointing />}
					selected={selected}
					setSelected={setSelected}
				/>
				<Item
					title="Coach"
					icon={<IoBus />}
					selected={selected}
					setSelected={setSelected}
				/>
				<Item
					title="Journey"
					icon={<FaRoute />}
					component={<Link to="/journey" />}
					selected={selected}
					setSelected={setSelected}
				/>
			</Menu>
		</ProSidebar>
	);
}
