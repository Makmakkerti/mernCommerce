import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, FormSelect } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productActions.js';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';

const ProductScreen = () => {
	let { id } = useParams();
	let navigate = useNavigate();

	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	const currentProduct = useSelector((state) => state.current);
	const { loading, error, product } = currentProduct;

	useEffect(() => {
		dispatch(getProductDetails(id));
	}, [dispatch, id]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const productData = (
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
								<Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
								{product.countInStock > 0 && (
									<Col>
										<strong>{product.countInStock}</strong>
									</Col>
								)}
							</ListGroup.Item>

							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Col>Qty: </Col>
									<Col>
										<FormSelect
											as='select'
											value={qty}
											onChange={(e) => setQty(e.target.value)}
										>
											{[...Array(product.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</FormSelect>
									</Col>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								<Button
									onClick={addToCartHandler}
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

	return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : productData;
};

export default ProductScreen;
