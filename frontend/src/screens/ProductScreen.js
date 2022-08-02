import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = () => {
	let { id } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		const getProduct = async () => {
			const { data } = await axios.get('/api/products/' + id);
			setProduct(data);
		};

		getProduct();
	}, [id]);

	return (
		<>
			<Link className='btn btn-dark my-3' to='/'>
				To homepage
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								rating={product.rating}
								text={`${product.numReviews} reviews`}
								color='#ababab'
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>Description: ${product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Col>Price: </Col>
								<Col>
									<strong>${product.price}</strong>
								</Col>
							</ListGroup.Item>

							<ListGroup.Item>
								<Col>In stock: </Col>
								<Col>
									<strong>{product.countInStock}</strong>
								</Col>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									className='btn btn-block'
									type='button'
									disabled={product.countInStock < 1}
								>
									Add to cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
