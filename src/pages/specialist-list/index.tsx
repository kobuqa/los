import { useEffect } from "react";
import { getSpecialists, specialistsSelector, specialistsStatusSelector } from "../../entities/specialist/model/slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SpecialistCard from "../../entities/specialist/ui/specialist-card";
import { Box, CircularProgress, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	gridTemplateRows: '2fr 2fr 2fr',
	gridColumnGap: '1vw',
	gridRowGap: '1vw',
}))

const SlaveList = () => {

	const dispatch = useAppDispatch()
	const specialists = useAppSelector(specialistsSelector)
	const status = useAppSelector(specialistsStatusSelector)
	useEffect(() => {
		specialists.length === 0 && dispatch(getSpecialists());
	}, [dispatch, specialists.length])

	if (status === 'loading') return <CircularProgress />;
	if (specialists.length === 0 && status === 'idle') return <Typography>There is no specialists data</Typography>
	return (
		<StyledBox>
			{!!specialists.length && specialists.map((specialist) => <SpecialistCard {...specialist} key={specialist.card.id} />)}
		</StyledBox>
	);
};

export default SlaveList;
