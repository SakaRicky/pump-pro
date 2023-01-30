import { TextField, useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormattedMessage } from "react-intl";

type Props = {
	label: string;
	type: React.HTMLInputTypeAttribute;
	name: string;
	multiline?: boolean;
};

interface configTextField {
	placeholder: string;
	size: "small" | "medium" | undefined;
	multiline?: boolean;
	type: React.HTMLInputTypeAttribute;
	error?: boolean;
	helperText?: string;
	fullWidth: boolean;
	variant: "filled" | "outlined";
}

const TextInput = ({ label, name, type, multiline }: Props) => {
	const [field, meta] = useField(name);

	const configTextField: configTextField = {
		...field,
		type: type,
		multiline: multiline,
		placeholder: `Enter ${name}`,
		size: "small",
		fullWidth: true,
		variant: "filled"
	};

	if (meta && meta.touched && meta.error) {
		configTextField.error = Boolean(meta && meta.touched && meta.error);
		configTextField.helperText = meta.error;
	}
	return (
		<Box>
			{label && (
				<Typography>
					<FormattedMessage id={`form.worker.${name}`} defaultMessage={label} />
				</Typography>
			)}
			<TextField {...configTextField} />
		</Box>
	);
};

export default TextInput;
