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

const SpecializationsForm = () => {

	const {
		control,
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<{ specializations: SpecializationDto[] }>({
		defaultValues: {
			specializations: [{
				name: "",
				domain: Specialization.FullStack
			}]
		}
	});

	const {fields, append, remove} = useFieldArray({control, name: "specializations"});

	return (
		<form onSubmit={handleSubmit(({specializations}) => postSpecializations(specializations))}>
			<ul>
				{fields.map((item, index) => (
					<li key={item.id}>
						<TextField
							fullWidth
							label={'Specialization Name'}
							error={errors.specializations ? !!errors.specializations[index]?.name : false}
							helperText={errors.specializations ? !!errors.specializations[index]?.name?.message : false}
							{...register(`specializations.${index}.name` as const, {required: true})}
						/>
						<FormControl fullWidth>
							<InputLabel>Specialization Domain</InputLabel>
							<Select
								label="Specialization Domain"
								error={errors.specializations ? !!errors.specializations[index]?.domain : false}
								{...register(`specializations.${index}.domain` as const, {required: true})}
								defaultValue={Specialization.FullStack}
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
				onClick={() => append({
					name: "",
					domain: Specialization.FullStack
				})}
			>
				Add More Skills
			</Button>
			<Button variant="contained" type="submit">Create Specializations</Button>
		</form>
	);
};

export default SpecializationsForm;
