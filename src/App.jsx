import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, useLocation } from "react-router-dom";
import { URL_TO_TAB } from "./constants";

function App() {
	const [theme, colorMode] = useMode();
	const location = useLocation();

	return (
		<ColorModeContext.Provider value={{ colorMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				{!Boolean(URL_TO_TAB[location.pathname]) ? (
					<Routes></Routes>
				) : (
					<div className="app">
						<main className="content">
							<Routes></Routes>
						</main>
					</div>
				)}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
