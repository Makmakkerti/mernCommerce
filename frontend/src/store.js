import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';

const middleware = [thunk];
const reducer = combineReducers({
	productList: productListReducer,
	current: productDetailsReducer,
	cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [{ _id: 1 }, { _id: 2 }];

const preloadedState = {
	cart: {
		cartItems: cartItemsFromStorage,
	},
};
const store = configureStore(
	{
		reducer,
	},
	preloadedState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
