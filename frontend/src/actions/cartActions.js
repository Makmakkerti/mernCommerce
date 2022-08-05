import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../reducers/cartReducer';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/product/${id}`);
	const { _id: product, name, image, price, countInStock, qty } = data;

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product,
			name,
			image,
			price,
			countInStock,
			qty,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
