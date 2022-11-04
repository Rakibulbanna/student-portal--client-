import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../App';

const AdmissionForm = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [department, setDepartment] = useState('SWE');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data)
		axios
			.post(`${process.env.REACT_APP_API_URL}/userInfo/`, data, {
				headers: {
					Authorization: `${loggedInUser?.token}`,
				},
			})
			.then((res) => {
				if(res?.data?.error){
					toast.error(res?.data?.message)
				}
				else{
					toast.success(res?.data?.message);
				}
				
			})
			.catch((err) => {
				
				alert(err)
				toast.error(err?.data?.message);
			});
	};

	return (
		<section>
			<div className="col-md-4 m-auto">
				<h1 className="h2 text-center">Admission Form</h1>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="fullNameInput">
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your full name"
							{...register('name', {
								required: true,
								maxLength: 35,
							})}
						/>
						{errors.name && (
							<Form.Text className="text-danger">
								Please enter your full name.
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className="mb-3" controlId="mobileNumberInput">
						<Form.Label>Mobile Number</Form.Label>
						<Form.Control
							type="tel"
							placeholder=" Enter Mobile Number"
							{...register('mobileNumber', {
								required: true,
							})}
						/>
						{errors.mobileNumber && (
							<Form.Text className="text-danger">
								Please enter your mobile number.
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className="mb-3" controlId="departmentInput">
						<Form.Label>Department</Form.Label>
						<Form.Select
							aria-label="department select"
							{...register('department', {
								required: true,
							})}
							value={department}
							onChange={(e) => setDepartment(e.target.value)}
						>
							<option value="SWE">SWE</option>
							<option value="CSE">CSE</option>
							<option value="EEE">EEE</option>
						</Form.Select>
						{errors.department && (
							<Form.Text className="text-danger">
								Please enter your department.
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className="mb-3" controlId="sscPointInput">
						<Form.Label>SSC Point</Form.Label>
						<Form.Control
							type="number"
							step="0.01"
							min="0"
							max="5"
							placeholder="Enter SSC Point(GPA)"
							{...register('sscPoint', {
								required: true,
							})}
						/>
						{errors.sscPoint && (
							<Form.Text className="text-danger">
								Please enter your SSC point.
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className="mb-3" controlId="hscPointInput">
						<Form.Label>HSC Point</Form.Label>
						<Form.Control
							type="number"
							step="0.01"
							min="0"
							max="5"
							placeholder="Enter HSC Point(GPA)"
							{...register('hscPoint', {
								required: true,
							})}
						/>
						{errors.hscPoint && (
							<Form.Text className="text-danger">
								Please enter your HSC point.
							</Form.Text>
						)}
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</section>
	);
};

export default AdmissionForm;
