import React from "react";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";


export const ProjectsForm = () => {
	const {control, register, formState: {errors}} = useFormContext();

	const {fields, remove, append} = useFieldArray({
		control,
		name: 'projects'
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
									label="Title"
									{...register(`projects[${idx}].title` as const, {required: true})}
									error={errors ? !!errors.projects?.[idx]?.title : false}
									helperText={errors ? !!errors.projects?.[idx]?.title.message : false}
								/>
								<TextField
									variant="outlined"
									label="Description"
									{...register(`projects[${idx}].description` as const, {required: true})}
									error={errors ? !!errors.projects?.[idx]?.description : false}
									helperText={errors ? !!errors.projects?.[idx]?.description.message : false}
								/>
								<TextField
									variant="outlined"
									label="Role"
									{...register(`projects[${idx}].role` as const, {required: true})}
									error={errors ? !!errors.projects?.[idx]?.role : false}
									helperText={errors ? !!errors.projects?.[idx]?.role.message : false}
								/>
								<TextField
									variant="outlined"
									label="Tech Stack"
									{...register(`projects[${idx}].techStack` as const, {required: true})}
									error={errors ? !!errors.projects?.[idx]?.techStack : false}
									helperText={errors ? !!errors.projects?.[idx]?.techStack.message : false}
								/>
								<TextField
									variant="outlined"
									label="Language"
									{...register(`projects[${idx}].language` as const, {required: true})}
									error={errors ? !!errors.projects?.[idx]?.language : false}
									helperText={errors ? !!errors.projects?.[idx]?.language.message : false}
								/>
								<TextField
									variant="outlined"
									label="Team"
									{...register(`projects[${idx}].team` as const, {required: true})}
									error={errors ? !!errors.projects?.[idx]?.team : false}
									helperText={errors ? !!errors.projects?.[idx]?.team.message : false}
								/>
								<Controller
									control={control}
									name={`projects[${idx}].startDate`}
									rules={{ required: true }}
									render={({field}) => (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label="Start Date"
												inputFormat="dd/MM/yyyy"
												renderInput={(params) =>
													<TextField
														{...params}
														error={errors ? !!errors.projects?.[idx]?.startDate : false}
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
									name={`projects[${idx}].endDate`}
									rules={{ required: true }}
									render={({field, formState: {errors}}) => (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label="End Date"
												inputFormat="dd/MM/yyyy"
												renderInput={(params) =>
													<TextField
														{...params}
														error={errors ? !!errors.projects?.[idx]?.endDate : false}
													/>
												}
												value={field.value}
												onChange={field.onChange}
											/>
										</LocalizationProvider>
									)}
								/>

								<Button variant="outlined" color="error" type="button" onClick={() => remove(idx)}>
									Delete Project
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
					title: "",
					description: "",
					role: "",
					techStack: "",
					language: "",
					team: "",
					startDate: null,
					endDate: null
				})}
			>
				Add Project
			</Button>
		</Box>
	);
};
