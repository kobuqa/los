import {Card, CardProps, styled} from "@mui/material";
import {SpecialistLevel} from "../../../shared/libs/types/SpecialistLevel.enum";
import {framePicker} from "../../../shared/libs/utils/framePicker";

interface StyledCardProps extends CardProps {
	level: SpecialistLevel
}

export const ColorizedCard = styled(Card)<StyledCardProps>(({level}) => ({
	border: `5px solid ${framePicker(level)}`,
	cursor: 'pointer',
	transition: 'transform .3s ease-in-out',
	"&:hover": {
		transform: 'scale(1.05)',
	}
}))








