import React, {FC} from 'react';
import {ColorizedCard} from "./styles";

const ColorizedFrame: FC<any> = ({children, level}) => {
	return (
		<ColorizedCard level={level} >
			{children}
		</ColorizedCard>
	);
};

export default ColorizedFrame;
