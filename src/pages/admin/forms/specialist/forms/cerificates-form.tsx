import React from "react";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";


export const CerificatesForm = () => {
	const {control, register, formState: {errors}} = useFormContext();

	const {fields, remove, append} = useFieldArray({
		control,
		name: 'certificates'
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
									{...register(`certificates[${idx}].title` as const, {required: true})}
									error={errors ? !!errors.certificates?.[idx]?.title : false}
									helperText={errors ? !!errors.certificates?.[idx]?.title?.message : false}
								/>
								<TextField
									variant="outlined"
									label="Description"
									{...register(`certificates[${idx}].description` as const, {required: true})}
									error={errors ? !!errors.certificates?.[idx]?.description : false}
									helperText={errors ? !!errors.certificates?.[idx]?.description?.message : false}
								/>
								<TextField
									variant="outlined"
									label="URL"
									{...register(`certificates[${idx}].url` as const, {required: true})}
									error={errors ? !!errors.certificates?.[idx]?.url : false}
									helperText={errors ? !!errors.certificates?.[idx]?.url?.message : false}
								/>
								<TextField
									variant="outlined"
									label="Image"
									{...register(`certificates[${idx}].image` as const, {required: true})}
									error={errors ? !!errors.certificates?.[idx]?.image : false}
									helperText={errors ? !!errors.certificates?.[idx]?.image?.message : false}
								/>
								<Controller
									control={control}
									name={`certificates[${idx}].gettingDate`}
									rules={{ required: true }}
									render={({field}) => (
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label="Getting Date"
												inputFormat="dd/MM/yyyy"
												renderInput={(params) =>
													<TextField
														{...params}
														error={errors ? !!errors.certificates?.[idx]?.gettingDate : false}
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
					title: "",
					description: "",
					url: "",
					image: "",
					gettingDate: null
				})}
			>
				Add Certificate
			</Button>
		</Box>
	);
};
