import {useFieldArray} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import SpecialistNestedFieldArray from "./specialist-nested-field-array";


const SpecialistFieldArray = ({control, register, defaultValues, errors}: any) => {
	const {fields, append, remove} = useFieldArray({
		control,
		name: "specialists"
	});

	return (
		<>
			<ul>
				{fields.map((item, index) => {
					return (
						<li key={item.id}>
							<TextField
								variant="outlined"
								//@ts-ignore
								defaultValue={item.name}
								{...register(`specialists[${index}].name` as const, {required: true})}
							/>
							{/* TODO: If want to remove specialists */}
							{/*<Button variant="outlined" color="error" type="button" onClick={() => remove(index)}>*/}
							{/*	Delete Specialist*/}
							{/*</Button>*/}
							<SpecialistNestedFieldArray
								nestIndex={index}
								{...{control, register, errors}}
							/>
						</li>
					);
				})}
			</ul>

			{/* TODO: If want to add more specialists */}
			{/*<Button*/}
			{/*	type="button"*/}
			{/*	onClick={() => {*/}
			{/*		append({*/}
			{/*			name: "Specialist Name",*/}
			{/*			projects: [{title: "Project A"}]*/}
			{/*		});*/}
			{/*	}}*/}
			{/*>*/}
			{/*	Add Specialist*/}
			{/*</Button>*/}
		</>
	);
}

export default SpecialistFieldArray;
