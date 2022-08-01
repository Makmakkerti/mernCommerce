import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Rating = (props) => {
	const ratings = [];
	let rating = props.rating;

	for (let i = 0; i < 5; i++) {
		if (rating > 0.5) {
			ratings.push('fa-solid fa-star');
		} else if (rating === 0.5) {
			ratings.push('fa-solid fa-star-half-stroke');
		} else {
			ratings.push('fa-regular fa-star');
		}
		--rating;
	}

	return (
		<>
			<div className='my-3'>
				{ratings.map((cn) => (
					<i key={uuidv4()} style={{ color: props.color }} className={cn}></i>
				))}{' '}
				{props.text}
			</div>
		</>
	);
};

export default Rating;
