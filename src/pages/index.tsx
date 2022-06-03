import {lazy} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

const SpecialistsPage = lazy(() => import("./specialist-list"));
const SpecialistDetailsPage = lazy(() => import("./specialist-details"));
const AdminPage = lazy(() => import("./admin"));

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/admin" element={<AdminPage/>}/>
			<Route path="/specialist" element={<SpecialistsPage/>}/>
			<Route path="/specialist/:id" element={<SpecialistDetailsPage/>}/>
			<Route
				path="*"
				element={<Navigate to="/specialist" replace/>}
			/>
		</Routes>
	);
};
