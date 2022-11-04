import axios from 'axios';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UserContext } from '../App';
import LoginForm from '../forms/LoginForm';

const Register = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const handleSubmit = (data) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/user/register`, data)
			.then((res) => {
				toast.success(res?.data?.message);
				navigate('/admission');
			})
			.catch((err) => {
				toast.error(res?.data?.message)
			});
	};

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ height: '90vh' }}
		>
			<div className="col-md-4">
				<LoginForm authType={'register'} onSubmit={handleSubmit} />
			</div>
		</Container>
	);
};

export default Register;
