import {
	Button,
	FormControl, FormHelperText, InputLabel, MenuItem, Select,
	TextField,
} from "@mui/material";
import {useFieldArray, useForm} from "react-hook-form";

import {postSpecialists} from "../../../shared/api/rest/specialist/postSpecialists";
import {useFormFetch} from "../../../shared/libs/hooks/useFormFetch";
import {EnglishLevel} from "../../../shared/libs/types/EnglishLevel.enum";
import FetchButton from "../../../shared/ui/components/fetch-button";
import {availabilityMapper, levelMapper} from "../../../shared/libs/helpers/mappers";
import {Availability} from "../../../shared/libs/types/Availability.enum";
import FetchAutocomplete from "../../../shared/ui/components/fetch-autocomplete";
import {LocationDto} from "../../../shared/api/rest/locations/location.dto";
import {getLocations} from "../../../shared/api/rest/locations/getLocations";
import {getSkills} from "../../../shared/api/rest/skills/getSkills";
import {postSkills} from "../../../shared/api/rest/skills/postSkills";
import {SpecialistLevel} from "../../../shared/libs/types/SpecialistLevel.enum";
import {getSpecializations} from "../../../shared/api/rest/specializations/getSpecializations";
import {SpecialistDto} from "../../../shared/api/rest/specialists/specialist.dto";

const SpecialistsFormOld = () => {
	const formDefaultValue = {
		specialists: [{
			name: "",
			image: "",
			about: "",
			level: "",
			skillIds: [],
			projects:  [{title: "a"}, {title: "b"}]
		}]
	}

	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: {errors},
	} = useForm<{ specialists: any[] }>({
		defaultValues: formDefaultValue
	});


	const {fields, remove, append} = useFieldArray({control, name: "specialists"});

	const {formFetchStatus, formSubmitFn} = useFormFetch({
		formFetchFn: postSpecialists,
		formClearFn: () => reset(formDefaultValue)
	});

	return (
		<form onSubmit={handleSubmit(({specialists}) => formSubmitFn(specialists))}>
			<ul>
				{fields.map((item, index) => {
					return (
						<li key={item.id}>
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
							<ol>
								{item.projects.map((project: any, idx: any) => {
									console.log(project)
									return (
										<li>
											{project.title}
										</li>)
								})}
								<button onClick={() => append({name: ""}) }>add project</button>
							</ol>

						</li>
					)
				})}


			</ul>
			<FetchButton
				variant="contained"
				type="submit"
				status={formFetchStatus}
			>
				Save Specialist
			</FetchButton>
		</form>
	);
};

export default SpecialistsFormOld;
