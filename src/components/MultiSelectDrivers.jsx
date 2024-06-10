import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
	Checkbox,
	ListItemText,
} from "@mui/material";

export default function MultiSelectDrivers({
	values,
	touched,
	errors,
	handleBlur,
	handleChange,
	drivers,
}) {
	return (
		<FormControl
			fullWidth
			error={!!touched.drivers && !!errors.drivers}
			sx={{ gridColumn: "span 2" }}
		>
			<InputLabel>DRIVERS</InputLabel>
			<Select
				name="drivers"
				label="DRIVERS"
				multiple
				value={values.drivers}
				onBlur={handleBlur}
				onChange={handleChange}
				renderValue={(selected) =>
					`${selected.length} DRIVER${selected.length > 1 ? "S" : ""}`
				}
			>
				{drivers.map((option) => (
					<MenuItem
						key={option.id}
						value={option.id}
						sx={{
							padding: "10px",
							fontStyle: "italic",
						}}
					>
						<Checkbox
							checked={values.drivers.indexOf(option.id) > -1}
						/>
						<ListItemText
							primary={`${option.fullName} (${option.typeLicense})`.toUpperCase()}
						/>
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{touched.drivers && errors.drivers}</FormHelperText>
		</FormControl>
	);
}
