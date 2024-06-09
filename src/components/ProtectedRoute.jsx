import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator.jsx";
import { ACCESS_TOKEN } from "../api/constants.js";

function ProtectedRoute() {
	const location = useLocation();
	const navigate = useNavigate();
	// AUTHENTICATE USER.
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem(ACCESS_TOKEN);
		setIsAuthenticated(token !== null);
	}, [location]);

	switch (isAuthenticated) {
		case null:
			return <LoadingIndicator />;
		case true:
			return <Outlet />;
		default:
			navigate("/login");
	}
}

export default ProtectedRoute;
