import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { MdPayment } from 'react-icons/md';

const PaymentForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="mb-3" controlId="cgpaInput">
				<Form.Label>CGPA</Form.Label>
				<Form.Control
					type="number"
					min="0"
					max="4"
					step="0.01"
					placeholder="Enter your CGPA"
					{...register('cgpa', {
						// required: true,
					})}
				/>
				{errors.mobileNumber && (
					<Form.Text className="text-danger">Please enter your CGPA.</Form.Text>
				)}
			</Form.Group>

			<Form.Group className="mb-3" controlId="amountInput">
				<Form.Label>Amount</Form.Label>
				<Form.Control
					type="number"
					min="1"
					max="85000"
					placeholder="Enter Amount"
					{...register('amount', {
						required: true,
						min: 0,
					})}
				/>
				{errors.amount && (
					<Form.Text className="text-danger">
						Please enter your payable amount.
					</Form.Text>
				)}
			</Form.Group>

			<div className="text-center">
				<Button variant="primary" type="submit">
					<MdPayment /> Pay
				</Button>
			</div>
		</Form>
	);
};

export default PaymentForm;
