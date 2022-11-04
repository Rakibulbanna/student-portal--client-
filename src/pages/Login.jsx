import axios from 'axios';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../App';
import LoginForm from '../forms/LoginForm';

const Login = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location?.state?.from?.pathname || '/admission';
	const handleSubmit = (data) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/user/login`, data)
			.then((res) => {
				// console.log(res.data)
				//toast.success(res?.data?.message);
				if(res?.data?.message=='User Not Found'){
					
					toast.error("User Not Found");
				}else{
				localStorage.setItem('user', JSON.stringify(res.data));
								setLoggedInUser(res.data);
								if (res?.data?.admitted === true) {
									navigate('/dashboard');
								} 
								if (res?.data?.admitted === false) {
									// setLoggedInUser(res.data);
									navigate('/admission');
					}	
				}
				
			})
			.catch((err) => {
				toast.error(err?.data?.message);
			});
	};

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ height: '90vh' }}
		>
			<div className="col-md-4">
				<LoginForm authType={'login'} onSubmit={handleSubmit} />
			</div>
		</Container>
	);
};

export default Login;
