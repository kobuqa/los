import {Button, Stack, TextField, Typography} from "@mui/material";
import { useFieldArray, useForm} from "react-hook-form";
import {SkillDto} from "../../../shared/api/rest/skills/skill.dto";
import {postSkills} from "../../../shared/api/rest/skills/postSkills";

const SkillsForm = () => {

	const {
		control,
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<{ skills: SkillDto[] }>({defaultValues: {skills: [{name: ""}]}});

	const {fields, append, remove} = useFieldArray({control, name: "skills"});

	return (
		<form onSubmit={handleSubmit(({skills}) => postSkills(skills))}>
			<ul>
				{fields.map((item, index) => (
					<li key={item.id}>
						<TextField
							label={'Skill Name'}
							error={errors.skills ? !!errors.skills[index]?.name : false}
							helperText={errors.skills ? !!errors.skills[index]?.name?.message : false}
							{...register(`skills.${index}.name` as const, { required: true })}
						/>
						<Button variant="outlined" type="button" disabled={fields.length < 2} onClick={() => remove(index)}>Remove </Button>
					</li>
				))}
			</ul>
			<Button
				variant="outlined"
				type="button"
				onClick={() => append({name: ""})}
			>
				Add More Skills
			</Button>
			<Button variant="contained" type="submit">Create Skills</Button>
		</form>
	);
};

export default SkillsForm;
