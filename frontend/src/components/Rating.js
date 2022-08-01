import React from 'react';

const Rating = (props) => {
	return (
		<div className='my-3'>
			{props.value} from {props.text}
		</div>
	);
};

export default Rating;
