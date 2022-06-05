import React, {useEffect} from 'react';
import {useForm, FormProvider} from "react-hook-form";
import SpecialistFormStepper from "./specialist-form-stepper";
import {useFormFetch} from "../../../../shared/libs/hooks/useFormFetch";
import {postSpecializations} from "../../../../shared/api/rest/specializations/postSpecializations";

const SpecialistForm = () => {
	const defaultValues = {
		name: "",
		image: "",
		about: "",
		level: "",
		skillIds: [],
		projects: [{
			title: "",
			description: "",
			role: "",
			techStack: "",
			language: "",
			team: "",
			startDate: null,
			endDate: null
		}]
	};
	const methods = useForm({ mode: "onChange", defaultValues });
	const {watch, trigger, reset, handleSubmit} = methods;
	const {formFetchStatus, formSubmitFn} = useFormFetch({
		formFetchFn: postSpecializations,
		formClearFn: () => reset(defaultValues)
	});

	const formValue = watch()
	useEffect(() => {
		console.log(formValue);
	}, [formValue])

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit((data) => formSubmitFn([data]))}>
				<SpecialistFormStepper formStatus={formFetchStatus} trigger={trigger}/>
			</form>
		</FormProvider>
	);
};

export default SpecialistForm;
