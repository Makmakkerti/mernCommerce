import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../reducers/cartReducer';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	const { name, image, price, countInStock } = data;

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: id,
			name,
			image,
			price,
			countInStock,
			qty,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
