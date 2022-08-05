import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducer.js';

const middleware = [thunk];
const reducer = combineReducers({
	productList: productListReducer,
	current: productDetailsReducer,
});
const initialState = {};
const store = configureStore(
	{
		reducer,
	},
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
