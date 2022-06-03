import {withProviders} from "./providers";
import {AppRouter} from "../pages";
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";

const App = () => {

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Box display="flex" columnGap={2}>
						<Button variant="contained">
							<NavLink to="/specialists" style={({isActive}) => ({
								color: '#fff',
								textDecoration: 'none',
							})}>
								Specialists
							</NavLink>
						</Button>
						<Button variant="contained">
							<NavLink to="/admin" style={({isActive}) => ({
								color: '#fff',
								textDecoration: 'none',
							})}>
								Admin
							</NavLink>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Container sx={{paddingY: '2rem'}}>
				<AppRouter/>
			</Container>
		</>
	)
}
export default withProviders(App);
