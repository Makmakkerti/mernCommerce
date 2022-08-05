export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

export const cartReducer = (
	state = {
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
	},
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			const existItem = state.cartItems.find((cartItem) => cartItem.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((cartItem) =>
						cartItem.product === existItem.product ? item : cartItem
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		default:
			return state;
	}
};
