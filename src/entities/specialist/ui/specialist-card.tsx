import {Box, CardHeader, CardMedia} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {User} from "../../../shared/libs/types/User.type";
import ColorizedFrame from "../../../features/specialist/colorized-frame";
import {SpecialistLevel} from "../../../shared/libs/types/SpecialistLevel.enum";


const SpecialistCard = ({id}: User) => {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(`/specialist/${id}`)

	return (
		<ColorizedFrame level={SpecialistLevel.Middle}>
			<Box onClick={handleNavigate}>
				<CardHeader title={'a'}/>
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
