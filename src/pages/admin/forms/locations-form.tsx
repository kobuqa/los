import {Button, TextField} from "@mui/material";
import {useFieldArray, useForm} from "react-hook-form";
import {LocationDto} from "../../../shared/api/rest/locations/location.dto";
import {postLocations} from "../../../shared/api/rest/locations/postLocations";
import {useFormFetch} from "../../../shared/libs/hooks/useFormFetch";
import FetchButton from "../../../shared/ui/components/fetch-button";

const LocationsForm = () => {

	const formDefaultValue = {locations: [{name: "", timeZone: ""}]}
	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: {errors}
	} = useForm<{ locations: LocationDto[] }>({defaultValues: formDefaultValue});

	const {fields, append, remove} = useFieldArray({control, name: "locations"});
	const {formFetchStatus, formSubmitFn} = useFormFetch({
		formFetchFn: postLocations,
		formClearFn: () => reset(formDefaultValue)
	});

	return (
		<form onSubmit={handleSubmit(({locations}) => formSubmitFn(locations))}
		      style={{display: 'flex', flexDirection: 'column', rowGap: 10}}>
			<ul>
				{fields.map((item, index) => (
					<li key={item.id}  style={{display: 'flex', flexDirection: 'column', rowGap: 10, marginBottom: 24}}>
						<TextField
							label={'Name'}
							error={errors.locations ? !!errors.locations[index]?.name : false}
							helperText={errors.locations ? !!errors.locations[index]?.name?.message : false}
							{...register(`locations.${index}.name` as const, {required: true})}
						/>
						<TextField
							label={'Time Zone'}
							error={errors.locations ? !!errors.locations[index]?.timeZone : false}
							helperText={errors.locations ? !!errors.locations[index]?.timeZone?.message : false}
							{...register(`locations.${index}.timeZone` as const, {required: true})}
						/>
						<Button
							variant="outlined"
							type="button"
							color="error"
							disabled={fields.length < 2}
							onClick={() => remove(index)}
						>
							Remove
						</Button>
					</li>
				))}
			</ul>
			<Button
				variant="outlined"
				type="button"
				onClick={() => append({name: "", timeZone: ""})}
			>
				Add Location
			</Button>
			<FetchButton
				variant="contained"
				type="submit"
				status={formFetchStatus}
			>
				Save Locations
			</FetchButton>
		</form>
	);
};

export default LocationsForm;
