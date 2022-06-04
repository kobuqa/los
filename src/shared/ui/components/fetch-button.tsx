import {Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";
import { FormSubmitStatus } from "../../libs/types/form-submit-status.enum";
import SendIcon from '@mui/icons-material/Send'
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';

interface FetchButtonProps extends ButtonProps{
	status: FormSubmitStatus
}
const FetchButton: FC<FetchButtonProps> = ({status, ...restProps}) => {
	const statusIconMap = {
		[FormSubmitStatus.Idle]: () => <SendIcon />,
		[FormSubmitStatus.Pending]: () => <CircularProgress color="inherit" size={20} />,
		[FormSubmitStatus.Error]: () => <ErrorIcon />,
		[FormSubmitStatus.Success]: () => <DoneIcon />,
	}

	const statusColorMap: {[key: string] : 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'} = {
		[FormSubmitStatus.Idle]: 'primary',
		[FormSubmitStatus.Pending]: 'warning',
		[FormSubmitStatus.Error]: 'error',
		[FormSubmitStatus.Success]: 'success'
	}
	return (
		<Button {...restProps} endIcon={statusIconMap[status]()} color={statusColorMap[status]} />
	);
};

export default FetchButton;
