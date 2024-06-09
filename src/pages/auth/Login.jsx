import { Box, Typography } from "@mui/material";
import Button from "../../components/customs/Button";
import TextField from "../../components/customs/TextField";
import PasswordField from "../../components/customs/PasswordField";
import * as yup from "yup";
import { Formik } from "formik";
import AxiosInstance from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../api/constants";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";

const initialValues = { username: "", password: "" };

const validationSchema = yup.object({
	username: yup.string().required("Username is required!"),
	password: yup.string().required("Password is required!"),
});

export default function Login() {
	const { notify } = useContext(ColorModeContext);
	const navigate = useNavigate();

	// CALL API LOGIN.
	const handleFormSubmit = async (values, { setSubmitting }) => {
		try {
			const response = await AxiosInstance.post("auth/login/", values);
			const data = response.data;

			localStorage.setItem(ACCESS_TOKEN, data.data);
			notify(data.message, "success");
			navigate("/");
		} catch (error) {
			notify(error?.response?.message || error.message, "error");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#8BC6EC",
				backgroundImage:
					"linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
			}}
		>
			<Box
				sx={{
					width: "35%",
					height: "70%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: "50px",
					borderRadius: "10px",
					backgroundColor: "#0093E9",
					backgroundImage:
						"linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
				}}
			>
				<Typography variant="h2" fontWeight="bold" letterSpacing={3}>
					ADMINISTRATOR
				</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleFormSubmit}
				>
					{({
						values,
						errors,
						touched,
						submitCount,
						isSubmitting,
						handleBlur,
						handleChange,
						handleSubmit,
					}) => (
						<form
							onSubmit={handleSubmit}
							style={{
								width: "80%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								gap: "25px",
							}}
						>
							<TextField
								name="username"
								label="USERNAME"
								style={{ width: "100%" }}
								value={values.username}
								onBlur={handleBlur}
								onChange={handleChange}
								error={
									Boolean(submitCount > 0) &&
									Boolean(touched.username) &&
									Boolean(errors.username)
								}
								helperText={
									Boolean(submitCount > 0) &&
									touched.username &&
									errors.username
								}
								autoFocus
							/>
							<PasswordField
								name="password"
								label="PASSWORD"
								style={{ width: "100%" }}
								value={values.password}
								handleBlur={handleBlur}
								handleChange={handleChange}
								error={
									Boolean(submitCount > 0) &&
									Boolean(touched.password) &&
									Boolean(errors.password)
								}
								helperText={
									Boolean(submitCount > 0) &&
									touched.password &&
									errors.password
								}
							/>

							<Button
								label="LOGIN"
								variant="contained"
								type="submit"
								disabled={isSubmitting}
								style={{
									marginTop: "50px",
									width: "100%",
									padding: "10px",
									color: "white",
									fontWeight: "bold",
									fontSize: "large",
									letterSpacing: 2,
								}}
							/>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}
