import {FormProvider, useForm} from "react-hook-form";
import SpecialistFieldArray from "./specialist-field-array-old-2";
import {Button} from "@mui/material";
const SpecialistsFormOld2 = () => {
	const defaultValues = {
		specialists: [
			{
				name: "",
				image: "",
				about: "",
				level: "",
				skillIds: [],
				projects: [{ title: "", description: "", role: "", techStack: "", language: "", team: "", startDate: null, endDate: null }]
			}
		]
	};
	const methods= useForm({
		mode: "onChange",
		defaultValues
	});

	const {control, register, getValues,  formState, formState: {errors}, handleSubmit} = methods;

	const onSubmit = (data:any) => console.log("data", data);
	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<SpecialistFieldArray {...{control, register, defaultValues, getValues, errors}} />
				<Button variant="contained" type="submit" disabled={!formState.isValid} >Submit</Button>
			</form>
		</FormProvider>

	);
};

export default SpecialistsFormOld2;
