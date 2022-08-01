import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating';

const Product = (props) => {
	const { product } = props;
	const ratings = [];
	let rating = product.rating;

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
		<Card className='my-3 p-3 rounded'>
			<a href={`/product/${product.id}`}>
				<Card.Img src={product.image} variant='top' />
			</a>

			<Card.Body>
				<a href={`/product/${product.id}`}>
					<Card.Title as='div'>
						<b>{product.name}</b>
					</Card.Title>
				</a>

				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
					{ratings.map((cn) => (
						<i className={cn}></i>
					))}
				</Card.Text>

				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
