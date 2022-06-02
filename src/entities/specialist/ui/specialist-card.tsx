import {Box, CardHeader, CardMedia} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {User} from "../../../shared/libs/types/User.type";
import ColorizedFrame from "../../../features/specialist/colorized-frame";


const SpecialistCard = ({id, firstName, level}: User) => {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(`/specialist/${id}`)

	return (
		<ColorizedFrame level={level}>
			<Box onClick={handleNavigate}>
				<CardHeader title={firstName}/>
				<CardMedia
					component="img"
					image="https://futhead.cursecdn.com/static/img/20/players_alt/p67150100.png"
					alt="Specialist Image"
				/>
			</Box>
		</ColorizedFrame>
	);
};

export default SpecialistCard;
