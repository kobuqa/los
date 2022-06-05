import React from "react";
import {Control, useFieldArray} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";

interface SpecialistNestedFieldArray {
	nestIndex: number;
	control: any;
	register: any;
}
const SpecialistNestedFieldArray = ({ nestIndex, control, register }: SpecialistNestedFieldArray) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `specialists[${nestIndex}].projects`
	});

	return (
		<div>
			{fields.map((item, k) => {
				return (
					<Box key={item.id} display="flex" >
						<TextField
							variant="outlined"
							{...register(`specialists[${nestIndex}].projects[${k}].title` as const, { required: true })}
							//@ts-ignore
							defaultValue={item.field1}
							style={{ marginRight: "25px" }}
						/>
						<Button  variant="outlined" color="error" type="button" onClick={() => remove(k)}>
							Delete Project
						</Button>
					</Box>
				);
			})}
			<Button
				variant="outlined"
				color="success"
				type="button"
				onClick={() => append({ title: "newProject"})}
			>
				Add Projects
			</Button>
		</div>
	);
};


export default SpecialistNestedFieldArray;
