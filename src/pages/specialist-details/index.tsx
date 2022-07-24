import {useNavigate, useParams} from "react-router-dom";
import {Button, Card} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {specialistByIdSelector} from "../../entities/specialist/model/slice";

const SlaveDetail = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const user = useAppSelector(specialistByIdSelector(+id!));
	const handleBack = () => navigate('/specialist')
	return (
		<Card>
			<Button onClick={handleBack}>Go back</Button>
			{user.id} Details
		</Card>
	);
};

export default SlaveDetail;
