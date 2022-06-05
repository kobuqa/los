import { Box, Tab, Tabs } from "@mui/material";
import SkillsForm from "./forms/skills-form";
import LocationsForm from "./forms/locations-form";
import SpecializationsForm from "./forms/specializations-form";
import {SyntheticEvent, useState } from "react";
import TabPanel from "../../shared/ui/components/tab-panel";
import SpecialistsForm from "./forms/specialists/specialists-form";

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => setActiveTab(newValue);
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={activeTab} onChange={handleChange}>
					<Tab label="Specialist"  />
					<Tab label="Other"  />
				</Tabs>
			</Box>
			<TabPanel value={activeTab} index={0}>
				<Box display="flex" justifyContent="center">
					<SpecialistsForm />
				</Box>
			</TabPanel>
			<TabPanel value={activeTab} index={1}>
				<Box display="flex" columnGap={3}>
				<SkillsForm />
				<LocationsForm />
				<SpecializationsForm />
				</Box>
			</TabPanel>
		</Box>
	);
};

export default AdminPage;
