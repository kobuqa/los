import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSpecialists, specialistByIdSelector, specialistsSelector, specialistsStatusSelector } from "../../entities/specialist/model/slice";
import { useEffect } from "react";

const SlaveDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useAppDispatch()
	const specialists = useAppSelector(specialistsSelector)
	const status = useAppSelector(specialistsStatusSelector)
	const user = useAppSelector(specialistByIdSelector(+id!));
	const handleBack = () => navigate('/specialists')
	useEffect(() => {
		specialists.length === 0 && dispatch(getSpecialists());
	}, [dispatch, specialists.length])

	if (status === 'loading') return <CircularProgress />


	if (user) return (
		<Card>
			<CardMedia component="img"
				image={user.card.image}
				alt={user.card.specialization.name}
				sx={{ aspectRatio: '1/0.8' }}
				height="220"
			/>
			<CardHeader title={user.card.specialization.name} />
			<CardContent>
				<Typography>Name: {user.card.name}</Typography>
				<Typography>Experience: {user.card.experience} year(s)</Typography>
				<Typography>Location: {user.card.location.name}</Typography>
				<Typography>Availability: {user.card.availability}</Typography>
				<Typography>About: {user.cv.about}</Typography>
				<Typography>English Level: {user.cv.englishLevel}</Typography>
				<Typography>Skills: {user.cv.skills.map(({ name }) => name).join(', ')}</Typography>
				{user.cv.education.map(({ id, startDate, endDate, organisationName, specialization, type, title }) => {
					return <Box key={id}>
						<Typography>Education #{id}</Typography>
						<Typography>Organisation: {organisationName}</Typography>
						<Typography>Specialization: {specialization}</Typography>
						<Typography>Type: {type}</Typography>
						<Typography>Title: {title}</Typography>
						<Typography>Period: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</Typography>
					</Box>
				})}
				{user.cv.projects.map(({ id, startDate, endDate, title, description, language, role, team, techStack }) => {
					return <Box key={id}>
						<Typography>Project #{id}</Typography>
						<Typography>Title: {title}</Typography>
						<Typography>Description: {description}</Typography>
						<Typography>Language: {language}</Typography>
						<Typography>Role: {role}</Typography>
						<Typography>Team: {team}</Typography>
						<Typography>Techstack: {techStack}</Typography>
						<Typography>Period: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</Typography>
					</Box>
				})}
				{user.cv.certificates.map(({ id, description, gettingDate, image, title, url }) => {
					return <Box key={id}>
						<Typography>Certificate #{id}</Typography>
						<img src={image} alt="title" height="100"/>
						<Typography>Title: <NavLink to={url}>{title}</NavLink> </Typography>
						<Typography>Description: {description}</Typography>
						<Typography>Getting Date: {new Date(gettingDate).toLocaleDateString()}</Typography>
					</Box>
				})}
			</CardContent>
			<CardActions>
				<Button size="small" onClick={handleBack}>Back</Button>
			</CardActions>
		</Card>
	);
	return null
};

export default SlaveDetail;
