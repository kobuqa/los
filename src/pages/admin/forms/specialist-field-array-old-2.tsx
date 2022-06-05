import {useFieldArray} from "react-hook-form";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import SpecialistNestedFieldArray from "./specialist-nested-field-array-old-2";
import FetchAutocomplete from "../../../shared/ui/components/fetch-autocomplete";
import {getSpecializations} from "../../../shared/api/rest/specializations/getSpecializations";
import {SpecialistLevel} from "../../../shared/libs/types/SpecialistLevel.enum";
import {availabilityMapper, levelMapper} from "../../../shared/libs/helpers/mappers";
import {EnglishLevel} from "../../../shared/libs/types/EnglishLevel.enum";
import {getLocations} from "../../../shared/api/rest/locations/getLocations";
import {LocationDto} from "../../../shared/api/rest/locations/location.dto";
import {getSkills} from "../../../shared/api/rest/skills/getSkills";
import {postSkills} from "../../../shared/api/rest/skills/postSkills";
import {Availability} from "../../../shared/libs/types/Availability.enum";


const SpecialistFieldArray = ({control, register, defaultValues, errors}: any) => {
	const {fields, append, remove} = useFieldArray({
		control,
		name: "specialists"
	});

	return (
		<>
			<ul>
				{fields.map((item, index) => {
					return (
						<li key={item.id}  style={{display: 'flex', columnGap: 16}}>
							<Paper sx={{padding: 4, display: 'flex', flexDirection: 'column', rowGap: 1}}>
								<InputLabel>General Info</InputLabel>
								<TextField
									fullWidth
									label={'Specialist Name'}
									error={errors.specialists ? !!errors.specialists[index]?.name : false}
									helperText={errors.specialists ? !!errors.specialists[index]?.name?.message : false}
									{...register(`specialists.${index}.name` as const, {required: true})}
								/>
								<TextField
									fullWidth
									label={'Profile Image URL'}
									error={errors.specialists ? !!errors.specialists[index]?.image : false}
									helperText={errors.specialists ? !!errors.specialists[index]?.image?.message : false}
									{...register(`specialists.${index}.image` as const, {required: true})}
								/>
								<TextField
									fullWidth
									label={'About'}
									error={errors.specialists ? !!errors.specialists[index]?.about : false}
									helperText={errors.specialists ? !!errors.specialists[index]?.about?.message : false}
									{...register(`specialists.${index}.about` as const, {required: true})}
								/>
								<FetchAutocomplete
									label={'Specialization'}
									fetchFn={getSpecializations}
									control={control}
									{...register(`specialists.${index}.specializationId` as const, {required: true})}
								/>
								<FormControl fullWidth>
									<InputLabel>Level</InputLabel>
									<Select
										label="Level"
										error={errors.specialists ? !!errors.specialists[index]?.level : false}
										{...register(`specialists.${index}.level` as const, {required: true})}
										defaultValue=""
									>
										{(Object.keys(SpecialistLevel) as (keyof typeof SpecialistLevel)[]).map((key) => {
											return (
												<MenuItem
													key={key}
													value={SpecialistLevel[key]}
												>
													{levelMapper(key)}
												</MenuItem>
											)
										})}
									</Select>
									<FormHelperText>{errors.specialists ? !!errors.specialists[index]?.level?.message : false}</FormHelperText>
								</FormControl>
								<FormControl fullWidth>
									<InputLabel>English Level</InputLabel>
									<Select
										label="English Level"
										error={errors.specialists ? !!errors.specialists[index]?.englishLevel : false}
										{...register(`specialists.${index}.englishLevel` as const, {required: true})}
										defaultValue=""
									>
										{(Object.keys(EnglishLevel) as (keyof typeof EnglishLevel)[]).map((key) => {
											return (
												<MenuItem
													key={key}
													value={EnglishLevel[key]}
												>
													{EnglishLevel[key]}
												</MenuItem>
											)
										})}
									</Select>
									<FormHelperText>{errors.specialists ? !!errors.specialists[index]?.level?.message : false}</FormHelperText>
								</FormControl>
								<FetchAutocomplete
									label={'Location'}
									fetchFn={getLocations}
									control={control}
									getOptionLabelFn={(location: LocationDto) => `${location.name} ${location.timeZone}`}
									{...register(`specialists.${index}.locationId` as const, {required: true})}
								/>
								<FetchAutocomplete
									label={'Skills'}
									multiple
									fetchFn={getSkills}
									createFn={postSkills}
									control={control}
									{...register(`specialists.${index}.skillIds` as const, {required: true})}
								/>
								<FormControl fullWidth>
									<InputLabel>Availability</InputLabel>
									<Select
										label="Availability"
										error={errors.specialists ? !!errors.specialists[index]?.availability : false}
										{...register(`specialists.${index}.availability` as const, {required: true})}
										defaultValue=""
									>
										{(Object.keys(Availability) as (keyof typeof Availability)[]).map((key) => {
											return (
												<MenuItem
													key={key}
													value={Availability[key]}
												>
													{availabilityMapper(key)}
												</MenuItem>
											)
										})}
									</Select>
									<FormHelperText>{errors.specialists ? !!errors.specialists[index]?.level?.message : false}</FormHelperText>
								</FormControl>
							</Paper>
							{/* TODO: If want to remove specialist */}
							{/*<Button variant="outlined" color="error" type="button" onClick={() => remove(index)}>*/}
							{/*	Delete Specialist*/}
							{/*</Button>*/}
							<Paper sx={{padding: 4}}>
								<InputLabel>Projects</InputLabel>
								<SpecialistNestedFieldArray
									nestedKey="projects"
									defaultValue={defaultValues.specialists[0].projects[0]}
									nestIndex={index}
									{...{control, register, errors}}
								/>
							</Paper>
						</li>
					);
				})}
			</ul>

			{/* TODO: If want to add more specialist */}
			{/*<Button*/}
			{/*	type="button"*/}
			{/*	onClick={() => {*/}
			{/*		append({*/}
			{/*			name: "Specialist Name",*/}
			{/*			projects: [{title: "Project A"}]*/}
			{/*		});*/}
			{/*	}}*/}
			{/*>*/}
			{/*	Add Specialist*/}
			{/*</Button>*/}
		</>
	);
}

export default SpecialistFieldArray;
