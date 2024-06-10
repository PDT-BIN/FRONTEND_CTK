import { Formik } from "formik";
import * as yup from "yup";
import { Box, MenuItem } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "../../components/customs/Dialog";
import Button from "../../components/customs/Button";
import TextField from "../../components/customs/TextField";
import {
	DatePicker,
	LocalizationProvider,
	TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import MultiSelectDrivers from "../../components/MultiSelectDrivers";

const initialValues = {
	departureDate: null,
	departureTime: null,
	estimatedTime: 0,
	price: 0,
	busId: "",
	departureProvinceId: "",
	destProvinceId: "",
	drivers: [],
};

const validationSchema = yup.object({
	departureDate: yup.object().nonNullable(),
	departureTime: yup.object().nonNullable(),
	estimatedTime: yup.number().required("Field is required!"),
	price: yup.number().required("Field is required!"),
	departureProvinceId: yup.number().required("Field is required!"),
	destProvinceId: yup.number().required("Field is required!"),
	busId: yup.number().required("Field is required!"),
	drivers: yup.array().length(1, "At least 1 driver!"),
});

export default function ModifyModal({
	title,
	isOpened,
	handleClose,
	handleFormSubmit,
	data: { coaches, drivers, provinces },
}) {
	return (
		<Dialog title={title} isOpened={isOpened} handleClose={handleClose}>
			<Formik
				initialValues={initialValues}
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
					<LocalizationProvider dateAdapter={AdapterMoment}>
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
								<DatePicker
									name="departureDate"
									label="DEPARTURE DATE"
									format="DD/MM/YYYY"
									value={values.departureDate}
									onChange={(value) =>
										(values.departureDate = value)
									}
									sx={{ gridColumn: "span 2" }}
								/>
								<TimePicker
									name="departureTime"
									label="DEPARTURE TIME"
									format="HH:mm"
									value={values.departureTime}
									onChange={(value) =>
										(values.departureTime = value)
									}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									name="departureProvinceId"
									label="DEPARTURE"
									type="number"
									value={values.departureProvinceId}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.departureProvinceId &&
										!!errors.departureProvinceId
									}
									helperText={
										touched.departureProvinceId &&
										errors.departureProvinceId
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
									select
								>
									{provinces.map((option) => (
										<MenuItem
											key={option.provinceId}
											value={option.provinceId}
											sx={{
												padding: "10px",
												fontStyle: "italic",
											}}
										>
											{option.provinceName.toUpperCase()}
										</MenuItem>
									))}
								</TextField>
								<TextField
									name="destProvinceId"
									label="DESTINATION"
									type="number"
									value={values.destProvinceId}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.destProvinceId &&
										!!errors.destProvinceId
									}
									helperText={
										touched.destProvinceId &&
										errors.destProvinceId
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
									select
								>
									{provinces.map((option) => (
										<MenuItem
											key={option.provinceId}
											value={option.provinceId}
											sx={{
												padding: "10px",
												fontStyle: "italic",
											}}
										>
											{option.provinceName.toUpperCase()}
										</MenuItem>
									))}
								</TextField>
								<TextField
									name="estimatedTime"
									label="DURATION (H)"
									type="number"
									value={values.estimatedTime}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.estimatedTime &&
										!!errors.estimatedTime
									}
									helperText={
										touched.estimatedTime &&
										errors.estimatedTime
									}
									sx={{ gridColumn: "span 2" }}
									fullWidth
								/>
								<TextField
									name="price"
									label="PRICE (VNĐ)"
									type="number"
									value={values.price}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.price && !!errors.price}
									helperText={touched.price && errors.price}
									sx={{ gridColumn: "span 2" }}
									fullWidth
								/>
								<TextField
									name="busId"
									label="COACH"
									type="number"
									value={values.busId}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.busId && !!errors.busId}
									helperText={touched.busId && errors.busId}
									sx={{ gridColumn: "span 2" }}
									fullWidth
									select
								>
									{coaches.map((option) => (
										<MenuItem
											key={option.id}
											value={option.id}
											sx={{
												padding: "10px",
												fontStyle: "italic",
											}}
										>
											{`${option.licensePlate} (${option.totalSeats} - ${option.busType})`}
										</MenuItem>
									))}
								</TextField>
								<MultiSelectDrivers
									values={values}
									touched={touched}
									errors={errors}
									handleBlur={handleBlur}
									handleChange={handleChange}
									drivers={drivers}
								/>
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
					</LocalizationProvider>
				)}
			</Formik>
		</Dialog>
	);
}
