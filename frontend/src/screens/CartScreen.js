import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

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

	console.log(id, qty);
	return <div>CartScreen</div>;
};

export default CartScreen;
