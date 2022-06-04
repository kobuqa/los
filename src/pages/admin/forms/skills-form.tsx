import {Button, TextField} from "@mui/material";
import { useFieldArray, useForm} from "react-hook-form";
import {SkillDto} from "../../../shared/api/rest/skills/skill.dto";
import {postSkills} from "../../../shared/api/rest/skills/postSkills";
import FetchButton from "../../../shared/ui/components/fetch-button";
import { useFormFetch } from "../../../shared/libs/hooks/useFormFetch";

const SkillsForm = () => {
	const formDefaultValue = {skills: [{name: ""}]}
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: {errors}
	} = useForm<{ skills: SkillDto[] }>({defaultValues: formDefaultValue});

	const {fields, append, remove} = useFieldArray({control, name: "skills"});
	const { formFetchStatus, formSubmitFn } = useFormFetch({formFetchFn: postSkills, formClearFn: () => reset(formDefaultValue)});
	return (
		<form onSubmit={handleSubmit(({skills}) => formSubmitFn(skills))} style={{display: 'flex', flexDirection: 'column', rowGap: 10}}>
			<ul >
				{fields.map((item, index) => (
					<li key={item.id}   style={{display: 'flex', flexDirection: 'column', rowGap: 10, marginBottom: 24}}>
						<TextField
							label={'Skill'}
							error={errors.skills ? !!errors.skills[index]?.name : false}
							helperText={errors.skills ? !!errors.skills[index]?.name?.message : false}
							{...register(`skills.${index}.name` as const, { required: true })}
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
				onClick={() => append({name: ""})}
			>
				Add Skill
			</Button>
			<FetchButton
				variant="contained"
				type="submit"
				status={formFetchStatus}
			>
				Save Skills
			</FetchButton>
		</form>
	);
};

export default SkillsForm;
