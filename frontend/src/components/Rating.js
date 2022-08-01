import React from 'react';

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
				{props.rating} from {props.text}
			</div>
			{ratings.map((cn) => (
				<i style={{ color: props.color }} className={cn}></i>
			))}
		</>
	);
};

export default Rating;
