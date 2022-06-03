import {Button, TextField} from "@mui/material";
import { useFieldArray, useForm} from "react-hook-form";
import {LocationDto} from "../../../shared/api/rest/locations/location.dto";
import {postLocations} from "../../../shared/api/rest/locations/postLocations";

const LocationsForm = () => {

	const {
		control,
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<{ locations: LocationDto[] }>({defaultValues: {locations: [{name: "", timeZone: ""}]}});

	const {fields, append, remove} = useFieldArray({control, name: "locations"});

	return (
		<form onSubmit={handleSubmit(({locations}) => postLocations(locations))}>
			<ul>
				{fields.map((item, index) => (
					<li key={item.id}>
						<TextField
							label={'Location Name'}
							error={errors.locations ? !!errors.locations[index]?.name : false}
							helperText={errors.locations ? !!errors.locations[index]?.name?.message : false}
							{...register(`locations.${index}.name` as const, { required: true })}
						/>
						<TextField
							label={'Location TimeZone'}
							error={errors.locations ? !!errors.locations[index]?.timeZone : false}
							helperText={errors.locations ? !!errors.locations[index]?.timeZone?.message : false}
							{...register(`locations.${index}.timeZone` as const, { required: true })}
						/>
						<Button variant="outlined" type="button" disabled={fields.length < 2} onClick={() => remove(index)}>Remove </Button>
					</li>
				))}
			</ul>
			<Button
				variant="outlined"
				type="button"
				onClick={() => append({name: "", timeZone: ""})}
			>
				Add More Skills
			</Button>
			<Button variant="contained" type="submit">Create Locations</Button>
		</form>
	);
};

export default LocationsForm;
