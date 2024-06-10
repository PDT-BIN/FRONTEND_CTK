import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { blue, green, grey, indigo, red } from "@mui/material/colors";

// COLOR-KEY.
const KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const AKEYS = ["A100", "A200", "A400", "A700"];
const PRIMARY_COLOR = {
	100: "#d0d1d5",
	200: "#a1a4ab",
	300: "#727681",
	400: "#1F2A40",
	500: "#141b2d",
	600: "#101624",
	700: "#0c101b",
	800: "#080b12",
	900: "#040509",
};

function reverseShade(shades) {
	return [KEYS, AKEYS].reduce((set, keys, _) => {
		// REVERSE COLOR-VALUE.
		const values = keys.map((key) => shades[key]).reverse();
		// COMBINE COLOR-KEY & COLOR-VALUE.
		const items = keys.reduce((items, key, index) => {
			items[key] = values[index];
			return items;
		}, {});
		return { ...set, ...items };
	}, {});
}

function reverseColor(colors) {
	// REVERSE SHADE.
	return Object.entries(colors).reduce((set, [name, shades], _) => {
		set[name] = { ...reverseShade(shades) };
		return set;
	}, {});
}

// COLOR DESIGN TOKEN.
export const tokens = (mode) => {
	const DARK_MODE = { grey, red, green, blue, primary: PRIMARY_COLOR };
	const LIGHT_MODE = reverseColor(DARK_MODE);

	return { ...(mode === "dark" ? DARK_MODE : LIGHT_MODE) };
};

// MUI THEME SETTINGS.
export const themeSettings = (mode) => {
	const colors = tokens(mode);

	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? // PALETTE VALUES FOR DARK MODE.
				  {
						primary: { main: colors.primary[500] },
						secondary: { main: colors.green[500] },
						background: { default: colors.primary[500] },
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
				  }
				: // PALETTE VALUES FOR LIGHT MODE.
				  {
						primary: { main: colors.primary[100] },
						secondary: { main: colors.green[500] },
						background: { default: "#FCFCFC" },
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
				  }),
		},
		typography: {
			fontFamily: ["JetBrains Mono", "monospace"].join(","),
			fontSize: 12,
			h1: { fontSize: 40 },
			h2: { fontSize: 32 },
			h3: { fontSize: 24 },
			h4: { fontSize: 20 },
			h5: { fontSize: 16 },
			h6: { fontSize: 14 },
		},
	};
};

// CONTEXT FOR COLOR MODE.
export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

// CONTROL MODE.
export const useMode = () => {
	const [mode, setMode] = useState("dark");

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prev) => (prev === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return [theme, colorMode];
};
