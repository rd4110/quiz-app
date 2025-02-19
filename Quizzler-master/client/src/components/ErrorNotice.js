import React from 'react';
import { Alert } from 'reactstrap';

const ErrorNotice = (props) => {
	return (
		<div>
			<Alert color='info' onClick={props.clearError}>
				{props.message}
			</Alert>
		</div>
	);
};

export default ErrorNotice;
