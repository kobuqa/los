import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const SpecialistList = lazy(() => import("./specialist-list"));
const SpecialistDetails = lazy(() => import("./specialist-details"));

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/specialist" element={<SpecialistList />} />
			<Route path="/specialist/:id" element={<SpecialistDetails />} />
			<Route
				path="*"
				element={<Navigate to="/specialist" replace />}
			/>
		</Routes>
	);
};
