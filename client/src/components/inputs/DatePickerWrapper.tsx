import { Box, TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useField, useFormikContext } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";

type DatePickerWrapperProps = {
	label?: string;
	name: string;
	value?: Date;
	handleChange?: (newValue: Date | null) => void;
};

const DatePickerWrapper = ({
	label,
	name,
	value,
	handleChange
}: DatePickerWrapperProps) => {
	const [field, meta] = useField(name);
	const { setFieldValue } = useFormikContext();

	const handleFormikChange = (newValue: Date | null) => {
		setFieldValue(name, newValue);
	};

	return (
		<DesktopDatePicker
			inputFormat="MM/DD/YYYY"
			value={value || meta.value}
			onChange={handleChange || handleFormikChange}
			renderInput={params => {
				return (
					<Box>
						{label && (
							<Typography>
								<FormattedMessage
									id={`form.worker.${name}`}
									defaultMessage={label}
								/>
							</Typography>
						)}
						<TextField size="small" variant="filled" {...params} />
					</Box>
				);
			}}
		/>
	);
};

export default DatePickerWrapper;
