import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/partials/Footer';
import Header from '../components/partials/Header';

const DefaultLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default DefaultLayout;
