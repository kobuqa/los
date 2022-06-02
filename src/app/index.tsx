import {withProviders} from "./providers";
import {AppRouter} from "../pages";
import {AppBar, Container, Toolbar} from "@mui/material";

const App = () => (
	<>
		<AppBar position="static">
			<Toolbar>
				League Of Slaves
			</Toolbar>
		</AppBar>
		<Container sx={{paddingY: '2rem'}}>
			<AppRouter/>
		</Container>
	</>
)
export default withProviders(App);
