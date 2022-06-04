import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import {useFieldArray, useForm} from "react-hook-form";
import {SpecializationDto} from "../../../shared/api/rest/specializations/specialization.dto";
import {Specialization} from "../../../shared/libs/types/specialization.enum";
import {postSpecializations} from "../../../shared/api/rest/specializations/postSpecializations";
import {useFormFetch} from "../../../shared/libs/hooks/useFormFetch";
import FetchButton from "../../../shared/ui/components/fetch-button";

const SpecializationsForm = () => {
	const formDefaultValue = {
		specializations: [{
			name: "",
			domain: Specialization.FullStack
		}]
	}

	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: {errors}
	} = useForm<{ specializations: SpecializationDto[] }>({
		defaultValues: formDefaultValue
	});

	const {fields, append, remove} = useFieldArray({control, name: "specializations"});
	const {formFetchStatus, formSubmitFn} = useFormFetch({
		formFetchFn: postSpecializations,
		formClearFn: () => reset(formDefaultValue)
	});

	return (
		<form onSubmit={handleSubmit(({specializations}) => formSubmitFn(specializations))}
		      style={{display: 'flex', flexDirection: 'column', rowGap: 10}}>
			<ul>
				{fields.map((item, index) => (
					<li key={item.id}
					    style={{display: 'flex', flexDirection: 'column', rowGap: 10, marginBottom: 24}}>
						<TextField
							fullWidth
							label={'Name'}
							error={errors.specializations ? !!errors.specializations[index]?.name : false}
							helperText={errors.specializations ? !!errors.specializations[index]?.name?.message : false}
							{...register(`specializations.${index}.name` as const, {required: true})}
						/>
						<FormControl fullWidth>
							<InputLabel>Domain</InputLabel>
							<Select
								label="Domain"
								error={errors.specializations ? !!errors.specializations[index]?.domain : false}
								{...register(`specializations.${index}.domain` as const, {required: true})}
								defaultValue=""
							>
								{(Object.keys(Specialization) as (keyof typeof Specialization)[]).map((key) => {
									return (
										<MenuItem
											key={key}
											value={Specialization[key]}
										>
											{key}
										</MenuItem>
									)
								})}
							</Select>
							<FormHelperText>{errors.specializations ? !!errors.specializations[index]?.domain?.message : false}</FormHelperText>
						</FormControl>
						<Button
							variant="outlined"
							type="button"
							color="error"
							disabled={fields.length < 2}
							onClick={() => remove(index)}>
							Remove
						</Button>
					</li>
				))}
			</ul>
			<Button
				variant="outlined"
				type="button"
				onClick={() => append({
					name: "",
					domain: Specialization.FullStack
				})}
			>
				Add Specialization
			</Button>
			<FetchButton
				variant="contained"
				type="submit"
				status={formFetchStatus}
			>
				Save Specializations
			</FetchButton>
		</form>
	);
};

export default SpecializationsForm;
