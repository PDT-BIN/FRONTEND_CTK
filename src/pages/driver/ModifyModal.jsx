import { Formik } from "formik";
import * as yup from "yup";
import { Box, MenuItem } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Dialog from "../../components/customs/Dialog";
import Button from "../../components/customs/Button";
import TextField from "../../components/customs/TextField";
import { DateTimeUtil } from "../../utils";
import { DRIVER_LICENSES, PHONE_REGEX } from "../../constants";

const initialValues = {
	fullName: "",
	dateOfBirth: null,
	phoneNumber: "",
	address: "",
	typeLicense: "",
};

const validationSchema = yup.object({
	fullName: yup.string().trim().required("Field is required!"),
	dateOfBirth: yup.object().nonNullable(),
	address: yup.string().trim().required("Field is required!"),
	typeLicense: yup.string().trim().required("Field is required!"),
	phoneNumber: yup
		.string()
		.trim("Field expects a phone number!")
		.matches(PHONE_REGEX, "Field is not valid!")
		.required("Field is required!")
		.strict(true),
});

const alterValues = ({ dateOfBirth, ...data }) => {
	if (!data.hasOwnProperty("id")) return initialValues;
	return {
		...initialValues,
		...data,
		dateOfBirth: !Boolean(dateOfBirth)
			? null
			: DateTimeUtil.parse(dateOfBirth, false),
	};
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
						<LocalizationProvider dateAdapter={AdapterMoment}>
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
									name="fullName"
									label="FULLNAME"
									type="text"
									value={values.fullName}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.fullName && !!errors.fullName
									}
									helperText={
										touched.fullName && errors.fullName
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
								/>
								<DatePicker
									name="dateOfBirth"
									label="DATE OF BIRTH"
									format="DD/MM/YYYY"
									value={values.dateOfBirth}
									onChange={(value) =>
										(values.dateOfBirth = value)
									}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									name="phoneNumber"
									label="PHONE NUMBER"
									type="text"
									value={values.phoneNumber}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.phoneNumber &&
										!!errors.phoneNumber
									}
									helperText={
										touched.phoneNumber &&
										errors.phoneNumber
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
								/>
								<TextField
									name="address"
									label="ADDRESS"
									type="text"
									value={values.address}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.address && !!errors.address
									}
									helperText={
										touched.address && errors.address
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
								/>
								<TextField
									name="typeLicense"
									label="LICENSE"
									type="text"
									value={values.typeLicense}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.typeLicense &&
										!!errors.typeLicense
									}
									helperText={
										touched.typeLicense &&
										errors.typeLicense
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
									select
								>
									{DRIVER_LICENSES.map((option) => (
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
						</LocalizationProvider>
					</form>
				)}
			</Formik>
		</Dialog>
	);
}
