import {useEffect} from "react";
import {getSpecialists, selectSpecialists} from "../../entities/specialist/model/slice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import SpecialistCard from "../../entities/specialist/ui/specialist-card";
import {Box, styled} from "@mui/material";

const StyledBox = styled(Box)(({theme}) => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
	gridTemplateRows: '2fr 2fr 2fr',
	gridColumnGap: '1vw',
	gridRowGap: '1vw',

}))

const SlaveList = () => {
	const dispatch = useAppDispatch()
	const specialists = useAppSelector(selectSpecialists)
	useEffect(() => {
		dispatch(getSpecialists());
	}, [])

	return (
		<StyledBox>
			{specialists.map((specialist) => <SpecialistCard {...specialist} key={specialist.id} />)}
		</StyledBox>
	);
};

export default SlaveList;
