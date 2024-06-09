import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IconButton, InputAdornment } from "@mui/material";
import TextField from "./TextField";

const PasswordField = (props) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<TextField
			name={props.name}
			label={props.label}
			type={showPassword ? "text" : "password"}
			value={props.value}
			onBlur={props.handleBlur}
			onChange={props.handleChange}
			error={props.error}
			helperText={props.helperText}
			color={props.color}
			style={props.style}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							onClick={() => setShowPassword(!showPassword)}
							edge="end"
						>
							{showPassword ? <IoIosEyeOff /> : <IoIosEye />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default PasswordField;
