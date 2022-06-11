import React from "react";
import { useFormContext} from "react-hook-form";
import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import FetchAutocomplete from "../../../../../shared/ui/components/fetch-autocomplete";
import {getSpecializations} from "../../../../../shared/api/rest/specializations/getSpecializations";
import {SpecialistLevel} from "../../../../../shared/libs/types/SpecialistLevel.enum";
import {availabilityMapper, levelMapper} from "../../../../../shared/libs/helpers/mappers";
import {EnglishLevel} from "../../../../../shared/libs/types/EnglishLevel.enum";
import {getLocations} from "../../../../../shared/api/rest/locations/getLocations";
import {LocationDto} from "../../../../../shared/api/rest/locations/location.dto";
import {getSkills} from "../../../../../shared/api/rest/skills/getSkills";
import {postSkills} from "../../../../../shared/api/rest/skills/postSkills";
import {Availability} from "../../../../../shared/libs/types/Availability.enum";

export const GeneralForm = () => {
	const methods = useFormContext();
	const {control, register, formState: {errors}} = methods;
	return (
		<Box display="flex" flexDirection="column" rowGap={2}>
			<TextField
				fullWidth
				label={'Specialist Name'}
				error={errors ? !!errors.name : false}
				helperText={errors ? !!errors.name?.message : false}
				{...register(`name` as const, {required: true})}
			/>
			<TextField
				fullWidth
				label={'Profile Image URL'}
				error={errors ? !!errors.image : false}
				helperText={errors ? !!errors.image?.message : false}
				{...register(`image` as const, {required: true})}
			/>
			<TextField
				fullWidth
				label={'About'}
				error={errors ? !!errors.about : false}
				helperText={errors ? !!errors.about?.message : false}
				{...register(`about` as const, {required: true})}
			/>
			<FetchAutocomplete
				label={'Specialization'}
				fetchFn={getSpecializations}
				control={control}
				{...register(`specializationId` as const, {required: true})}
			/>
			<FormControl fullWidth error={errors ? !!errors.level : false}>
				<InputLabel>Level</InputLabel>
				<Select
					label="Level"

					{...register(`level` as const, {required: true})}
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
				<FormHelperText>{errors ? !!errors.level?.message : false}</FormHelperText>
			</FormControl>
			<FormControl fullWidth error={errors ? !!errors.englishLevel : false}>
				<InputLabel>English Level</InputLabel>
				<Select
					label="English Level"
					error={errors ? !!errors.englishLevel : false}
					{...register(`englishLevel` as const, {required: true})}
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
				<FormHelperText>{errors ? !!errors.level?.message : false}</FormHelperText>
			</FormControl>
			<FetchAutocomplete
				label={'Location'}
				fetchFn={getLocations}
				control={control}
				getOptionLabelFn={(location: LocationDto) => `${location.name} ${location.timeZone}`}
				{...register(`locationId` as const, {required: true})}
			/>
			<FetchAutocomplete
				label={'Skills'}
				multiple
				fetchFn={getSkills}
				createFn={postSkills}
				control={control}
				{...register(`skillIds` as const, {required: true})}
			/>
			<FormControl fullWidth error={errors ? !!errors.availability : false}>
				<InputLabel>Availability</InputLabel>
				<Select
					label="Availability"
					error={errors ? !!errors.availability : false}
					{...register(`availability` as const, {required: true})}
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
				<FormHelperText>{errors ? !!errors.level?.message : false}</FormHelperText>
			</FormControl>
		</Box>
	);
};
