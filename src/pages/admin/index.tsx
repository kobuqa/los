import { Box } from "@mui/material";
import SkillsForm from "./forms/skills-form";
import LocationsForm from "./forms/locations-form";
import SpecializationsForm from "./forms/specializations-form";

const AdminPage = () => {

	return (
		<Box sx={{
			display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
			gridTemplateRows: '2fr 2fr 2fr',
			gridColumnGap: '1vw',
			gridRowGap: '1vw',
		}}>
			<SkillsForm />
			<LocationsForm />
			<SpecializationsForm />
		</Box>
	);
};

export default AdminPage;
