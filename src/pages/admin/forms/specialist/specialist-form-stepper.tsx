import React, {useState} from 'react';
import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import {GeneralForm} from "./forms/general-form";
import {ProjectsForm} from "./forms/projects-form";
import {CerificatesForm} from "./forms/cerificates-form";
import {EducationForm} from "./forms/education-form";
import FetchButton from "../../../../shared/ui/components/fetch-button";

const steps = ['General', 'Projects', 'Certificates', 'Education'];

const getForm = (activeStep: number) => {

	switch (activeStep) {
		case 0:
			return <GeneralForm/>;
		case 1:
			return <ProjectsForm/>
		case 2:
			return <CerificatesForm/>
		case 3:
			return <EducationForm/>
	}
}
const SpecialistFormStepper = ({formStatus, trigger}: any) => {
	const [activeStep, setActiveStep] = useState(0);
	const handleNextStep = async () => {
		let isValid = false;
		switch (activeStep) {
			case 0:
				isValid = await trigger(['name', 'image', 'about', 'level', 'skillIds', 'englishLevel', 'specializationId', 'locationId', 'availability']);
				break;
			case 1:
				isValid = await trigger(['projects']);
				break;
			case 2:
				isValid = await trigger(['certificates']);
				break;
			case 3:
				isValid = await trigger(['education']);
				break;
		}
		if (isValid && activeStep + 1 !== steps.length) setActiveStep((prevStep) => ++prevStep)
	}
	const handlePrevStep = () => {
		if (activeStep > 0) setActiveStep((prevStep) => --prevStep)
	}
	return (
		<Box width="100%">
			<Stepper activeStep={activeStep}>
				{steps.map((step, idx) => (
					<Step key={step}>
						<StepLabel>{steps[idx]}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Box p={2}>
				{getForm(activeStep)}
			</Box>
			<Button onClick={handlePrevStep} disabled={activeStep === 0}>Back</Button>
			{activeStep + 1 !== steps.length ? <Button onClick={handleNextStep}>Next</Button> : <FetchButton
				variant="contained"
				type="submit"
				status={formStatus}
			>
				Save Specialist
			</FetchButton>}


		</Box>

	);
};

export default SpecialistFormStepper;
