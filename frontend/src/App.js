import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import './App.css';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import Notifications from 'react-notify-toast';

function App() {
	return (
		<Router>
			<Notifications />
			<Header />
			<main className='py-3'>
				<Container>
					<Routes>
						<Route exact path='/' element={<HomeScreen />} />
						<Route path='/login' element={<LoginScreen />} />
						<Route path='/product/:id' element={<ProductScreen />} />
						<Route path='/cart/:id' element={<CartScreen />} />
						<Route path='/cart' element={<CartScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
