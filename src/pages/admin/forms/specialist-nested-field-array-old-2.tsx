import React from "react";
import {Control, Controller, useFieldArray} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface SpecialistNestedFieldArrayOld2 {
	nestIndex: number;
	control: any;
	register: any;
	nestedKey: string;
	defaultValue: any;
}
const SpecialistNestedFieldArray = ({ nestIndex, control, register, nestedKey, defaultValue }: SpecialistNestedFieldArrayOld2) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `specialists[${nestIndex}][${nestedKey}]`
	});

	return (
		<div>
			{fields.map((item, k) => {
				return (
					<Box key={item.id} display="flex" flexDirection="column">
						<TextField
							variant="outlined"
							label="Title"
							{...register(`specialists[${nestIndex}][${nestedKey}][${k}].title` as const, { required: true })}
							defaultValue={defaultValue.title}
						/>
						<TextField
							variant="outlined"
							label="Description"
							{...register(`specialists[${nestIndex}][${nestedKey}][${k}].description` as const, { required: true })}
							defaultValue={defaultValue.description}
						/>
						<TextField
							variant="outlined"
							label="Role"
							{...register(`specialists[${nestIndex}][${nestedKey}][${k}].role` as const, { required: true })}
							defaultValue={defaultValue.role}
						/>
						<TextField
							variant="outlined"
							label="Tech Stack"
							{...register(`specialists[${nestIndex}][${nestedKey}][${k}].techStack` as const, { required: true })}
							defaultValue={defaultValue.techStack}
						/>
						<TextField
							variant="outlined"
							label="Language"
							{...register(`specialists[${nestIndex}][${nestedKey}][${k}].language` as const, { required: true })}
							defaultValue={defaultValue.language}
						/>
						<TextField
							variant="outlined"
							label="Team"
							{...register(`specialists[${nestIndex}][${nestedKey}][${k}].team` as const, { required: true })}
							defaultValue={defaultValue.team}
						/>
						<Controller
							control={control}
							name={`specialists[${nestIndex}][${nestedKey}][${k}].startDate`}
							render={({ field }) => (
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Start Date"
										renderInput={(params) => <TextField {...params} />}
										value={field.value}
										onChange={field.onChange}
									/>
								</LocalizationProvider>
							)}
								/>
						<Controller
							control={control}
							name={`specialists[${nestIndex}][${nestedKey}][${k}].endDate`}
							render={({ field }) => (
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="End Date"
										renderInput={(params) => <TextField {...params} />}
										value={field.value}
										onChange={field.onChange}
									/>
								</LocalizationProvider>
							)}
						/>

						<Button  variant="outlined" color="error" type="button" onClick={() => remove(k)}>
							Delete Project
						</Button>
					</Box>
				);
			})}
			<Button
				variant="outlined"
				color="success"
				type="button"
				onClick={() => append(defaultValue)}
			>
				Add Projects
			</Button>
		</div>
	);
};


export default SpecialistNestedFieldArray;
