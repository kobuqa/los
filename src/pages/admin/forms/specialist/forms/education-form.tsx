import React from "react";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {EducationType} from "../../../../../shared/libs/types/EducationType.enum";


export const EducationForm = () => {
	const {control, register, formState: {errors}} = useFormContext();

	const {fields, remove, append} = useFieldArray({
		control,
		name: 'education'
	});

	return (
		<Box display="flex" flexDirection="column" rowGap={1} alignItems="center">
			<ul style={{display: 'flex', columnGap: 16}}>
				{fields.map((item, idx) => {
					return (
						<li key={item.id}>
							<Box display="flex" flexDirection="column" rowGap={1}>
								<TextField
									variant="outlined"
									label="Organisation Name"
									{...register(`education[${idx}].organisationName` as const, {required: true})}
									error={errors ? !!errors.education?.[idx]?.organisationName : false}
									helperText={errors ? !!errors.education?.[idx]?.organisationName?.message : false}
								/>
								<FormControl fullWidth error={errors ? !!errors.education?.[idx]?.type : false}>
									<InputLabel>Type</InputLabel>
									<Select
										label="Type"
										error={errors ? !!errors.education?.[idx]?.type : false}
										{...register(`education[${idx}].type` as const, {required: true})}
										defaultValue=""
									>
										{(Object.keys(EducationType) as (keyof typeof EducationType)[]).map((key) => {
											return (
												<MenuItem
													key={key}
													value={EducationType[key]}
												>
													{EducationType[key]}
												</MenuItem>
											)
										})}
									</Select>
									<FormHelperText>{errors ? !!errors.education?.[idx]?.type?.message  : false}</FormHelperText>
								</FormControl>
								<TextField
									variant="outlined"
									label="Specialization"
									{...register(`education[${idx}].specialization` as const, {required: true})}
									error={errors ? !!errors.education?.[idx]?.specialization : false}
									helperText={errors ? !!errors.education?.[idx]?.specialization?.message : false}
								/>
								<TextField
									variant="outlined"
									label="Title"
									{...register(`education[${idx}].title` as const, {required: true})}
									error={errors ? !!errors.education?.[idx]?.title : false}
									helperText={errors ? !!errors.education?.[idx]?.title?.message : false}
								/>
								<Controller
									control={control}
									name={`education[${idx}].startDate`}
									rules={{ required: true }}
									render={({field}) => (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label="Start Date"
												inputFormat="dd/MM/yyyy"
												renderInput={(params) =>
													<TextField
														{...params}
														error={errors ? !!errors.education?.[idx]?.startDate : false}
													/>
												}
												value={field.value}
												onChange={field.onChange}
											/>
										</LocalizationProvider>
									)}
								/>
								<Controller
									control={control}
									name={`education[${idx}].endDate`}
									rules={{ required: true }}
									render={({field, formState: {errors}}) => (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label="End Date"
												inputFormat="dd/MM/yyyy"
												renderInput={(params) =>
													<TextField
														{...params}
														error={errors ? !!errors.education?.[idx]?.endDate : false}
													/>
												}
												value={field.value}
												onChange={field.onChange}
											/>
										</LocalizationProvider>
									)}
								/>

								<Button variant="outlined" color="error" type="button" onClick={() => remove(idx)}>
									Delete Certificate
								</Button>
							</Box>
						</li>
					);

				})}
			</ul>
			<Button
				variant="outlined"
				color="success"
				type="button"
				onClick={() => append({
					organisationName: "",
					type: "",
					specialization: "",
					title: "",
					startDate: null,
					endDate: null,
				})}
			>
				Add Certificate
			</Button>
		</Box>
	);
};
