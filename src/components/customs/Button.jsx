import { Button as MButton } from "@mui/material";

export default function Button({ style, label, hiddenInput, ...rest }) {
	return (
		<MButton type="button" variant="text" sx={style} {...rest}>
			{label}
			{hiddenInput}
		</MButton>
	);
}
