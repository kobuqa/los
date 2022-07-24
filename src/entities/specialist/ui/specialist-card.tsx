import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../../shared/libs/types/User.type";


const SpecialistCard = ({ card: { id, name, image, experience, specialization, availability, location } }: User) => {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(`/specialist/${id}`)
	return (
		<Card>
			<CardMedia component="img"
				image={image}
				alt={specialization.name}
				sx={{ aspectRatio: '1/0.8' }}
			/>
			<CardHeader title={specialization.name} />
			<CardContent>
				<Typography>Name: {name}</Typography>
				<Typography>Experience: {experience} year(s)</Typography>
				<Typography>Location: {location.name}</Typography>
				<Typography>Availability: {availability}</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={handleNavigate}>See More</Button>
			</CardActions>
		</Card>
	);
};

export default SpecialistCard;
