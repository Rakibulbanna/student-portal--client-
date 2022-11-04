import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { UserContext } from '../App';

const Transaction = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [transaction, setTransaction] = useState([]);

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_API_URL}/userInfo/transaction/${loggedInUser?.mobileNumber}`,
				{
					headers: {
						Authorization: `${loggedInUser?.token}`,
					},
				}
			)
			.then((res) => {
				setTransaction(res.data);
			})
			.catch((err) => console.log(err));
	}, [loggedInUser]);
	return (
		<Container>
			<h1 className="my-4 h3 text-center">Transaction</h1>

			<Table striped bordered hover className="mb-4">
				<thead>
					<tr>
						<th>#</th>
						<th>Semester Name</th>
						<th>Payable Money</th>
						<th>Paid Money</th>
						<th>Due Money</th>
					</tr>
				</thead>
				<tbody>
					{transaction?.map((item, idx) => (
						<tr key={item?._id}>
							<td>{idx + 1}</td>
							<td>{item?.semesterName}</td>
							<td>{item?.totalpayable}</td>
							<td>{item?.paid}</td>
							<td>{item?.due?.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Transaction;
