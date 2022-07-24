import React, {useEffect} from 'react';
import {useForm, FormProvider} from "react-hook-form";
import SpecialistFormStepper from "./specialist-form-stepper";
import {useFormFetch} from "../../../../shared/libs/hooks/useFormFetch";
import {postSpecialists} from "../../../../shared/api/rest/specialist/postSpecialists";

const SpecialistForm = () => {
	const defaultValues = {
		name: "",
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
		}],
		certificates: [{
			title: "",
			description: "",
			url: "",
			image: "",
			gettingDate: null
		}],
		education: [{
			organisationName: "",
			type: "",
			specialization: "",
			title: "",
			startDate: null,
			endDate: null,
		}]
	};
	const methods = useForm({ mode: "onChange", defaultValues });
	const {watch, trigger, reset, handleSubmit} = methods;
	const {formFetchStatus, formSubmitFn} = useFormFetch({
		formFetchFn: postSpecialists,
		formClearFn: () => reset(defaultValues)
	});

	const formValue = watch()
	useEffect(() => {
		console.log(formValue);
	}, [formValue])

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit((data) => formSubmitFn(data))}>
				<SpecialistFormStepper formStatus={formFetchStatus} trigger={trigger}/>
			</form>
		</FormProvider>
	);
};

export default SpecialistForm;
