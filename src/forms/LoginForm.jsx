import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm = ({ authType = 'login', onSubmit }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	return (
		<>
			<h1 className="mb-4 h2 text-center">
				{authType === 'register' ? 'Create an Account' : 'Login'}
			</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3" controlId="mobileNumberInput">
					<Form.Label>Mobile Number</Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter Mobile Number"
						{...register('mobileNumber', {
							required: true,
							minLength: 11,
							maxLength: 14,
						})}
					/>
					{errors.mobileNumber && (
						<Form.Text className="text-danger">
							Please enter a valid mobile number.
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className="mb-3" controlId="passwordInput">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder=" Enter Password"
						{...register('password', {
							required: true,
							pattern: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
						})}
					/>
					{errors.password && (
						<Form.Text className="text-danger">
							Please enter a valid password.
						</Form.Text>
					)}
				</Form.Group>

				<div className="text-center">
					<Button variant="primary" type="submit">
						{authType === 'register' ? 'Register' : 'Login'}
					</Button>
					{authType === 'login' && (
						<p className="mt-3">
							Don't have an account?
							<br />
							<Link to="/register">Create an account</Link>
						</p>
					)}
				</div>
			</Form>
		</>
	);
};

export default LoginForm;
