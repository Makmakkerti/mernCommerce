import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, FormSelect } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
	const { id } = useParams('id');
	const locationQty = useLocation().search;
	const qty = locationQty ? Number(locationQty.split('=')[1]) : 1;

	const dispatch = useDispatch();

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		console.log('checkout');
	};

	const { cartItems } = useSelector((state) => state.cart);
	return (
		<Row>
			<Col md={8}>
				<Link className='btn btn-outline-dark my-3' to='/'>
					To homepage
				</Link>
				<h1>Shopping Cart</h1>
				{!cartItems.length ? (
					<Message>Cart is empty</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>
											<h5>{item.name}</h5>
										</Link>
									</Col>
									<Col md={2}>
										<h5>${item.price}</h5>
									</Col>
									<Col md={3}>
										<ListGroup.Item>
											<Col>
												Qty:
												<FormSelect
													as='select'
													value={item.qty}
													onChange={(e) =>
														dispatch(
															addToCart(
																item.product,
																Number(e.target.value)
															)
														)
													}
												>
													{[...Array(item.countInStock).keys()].map(
														(x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														)
													)}
												</FormSelect>
											</Col>
										</ListGroup.Item>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Purchase ({cartItems.reduce((acc, i) => acc + i.qty, 0)}) items:
								<br />$
								{cartItems
									.reduce((acc, currentItem) => {
										return acc + currentItem.qty * currentItem.price;
									}, 0)
									.toFixed(2)}
							</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								variant='outline-success'
								disabled={!cartItems.length}
								onClick={checkoutHandler}
							>
								Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
