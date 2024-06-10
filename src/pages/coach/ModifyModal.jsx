import { Formik } from "formik";
import * as yup from "yup";
import { Box, MenuItem } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "../../components/customs/Dialog";
import Button from "../../components/customs/Button";
import TextField from "../../components/customs/TextField";
import { COACH_TYPES } from "../../constants";

const initialValues = { licensePlate: "", busType: "" };

const validationSchema = yup.object({
	licensePlate: yup.string().trim().required("Field is required!"),
	busType: yup.string().trim().required("Field is required!"),
});

const alterValues = (data) => {
	if (!data.hasOwnProperty("id")) return initialValues;
	return { ...initialValues, ...data };
};

export default function ModifyModal({
	title,
	isOpened,
	handleClose,
	handleFormSubmit,
	data,
}) {
	// CONTROL INITIAL VALUES.
	let convertedValues = alterValues(data);

	return (
		<Dialog title={title} isOpened={isOpened} handleClose={handleClose}>
			<Formik
				initialValues={convertedValues}
				validationSchema={validationSchema}
				onSubmit={handleFormSubmit}
				enableReinitialize
			>
				{({
					values,
					errors,
					touched,
					isSubmitting,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								"& .MuiFormHelperText-root": {
									fontStyle: "italic",
								},
							}}
						>
							<TextField
								name="licensePlate"
								label="LICENSE PLATE"
								type="text"
								value={values.licensePlate}
								onBlur={handleBlur}
								onChange={handleChange}
								error={
									!!touched.licensePlate &&
									!!errors.licensePlate
								}
								helperText={
									touched.licensePlate && errors.licensePlate
								}
								sx={{ gridColumn: "span 2" }}
								fullWidth
							/>
							<TextField
								name="busType"
								label="COACH TYPE"
								type="text"
								value={values.busType}
								onBlur={handleBlur}
								onChange={handleChange}
								error={!!touched.busType && !!errors.busType}
								helperText={touched.busType && errors.busType}
								sx={{ gridColumn: "span 2" }}
								fullWidth
								select
							>
								{COACH_TYPES.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
										sx={{
											padding: "10px",
											fontStyle: "italic",
										}}
									>
										{option.label.toUpperCase()}
									</MenuItem>
								))}
							</TextField>
						</Box>

						<DialogActions sx={{ mt: "25px", gap: "10px" }}>
							<Button
								label="SUBMIT"
								variant="contained"
								type="submit"
								disabled={isSubmitting}
								style={{
									width: "15%",
									padding: "10px",
									color: "white",
								}}
							/>
							<Button
								label="CANCEL"
								variant="contained"
								onClick={handleClose}
								style={{
									width: "15%",
									padding: "10px",
									color: "white",
								}}
							/>
						</DialogActions>
					</form>
				)}
			</Formik>
		</Dialog>
	);
}
