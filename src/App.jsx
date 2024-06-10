import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, useLocation } from "react-router-dom";
import { URL_TO_TAB } from "./constants";
import NotFound from "./components/NotFound";
import Login from "./pages/auth/Login";
import Notification, { controlNotify } from "./components/Notification";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Employee from "./pages/employee";
import Driver from "./pages/driver";
import Coach from "./pages/coach";

function App() {
	const [theme, colorMode] = useMode();
	const location = useLocation();

	function notify(message, severity) {
		controlNotify({ open: true, message, severity });
	}

	return (
		<ColorModeContext.Provider value={{ colorMode, notify }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				{!Boolean(URL_TO_TAB[location.pathname]) ? (
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				) : (
					<div className="app">
						<Sidebar />
						<main className="content">
							<Topbar />
							<div className="display">
								<Routes>
									<Route
										path="/employee"
										element={<Employee />}
									/>
									<Route
										path="/driver"
										element={<Driver />}
									/>
									<Route path="/coach" element={<Coach />} />
								</Routes>
							</div>
						</main>
					</div>
				)}

				<Notification />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
