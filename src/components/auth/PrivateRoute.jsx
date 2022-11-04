import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	// const [loading, setLoading] = useState(true);
	// const user = localStorage.getItem('user');
	const location = useLocation();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		setLoggedInUser(user);
	}, []);
	
	// useEffect(() => {
	// 	setLoading(false);
	// 	if (user) {
	// 		setLoggedInUser(user);
	// 	}
	// }, [user]);

	// if (loading) {
	// 	return <p>Loading...</p>;
	// }
	if (!loggedInUser) {
		return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
	}
	return children;
};

export default PrivateRoute;
