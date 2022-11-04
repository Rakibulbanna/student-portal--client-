import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import PaymentForm from "../forms/PaymentForm";

const Dashboard = () => {
  const [payment, setPayment] = useState({});
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
console.log("user_____", loggedInUser);
  useEffect(() => {
	if(loggedInUser) {
		axios
		  .get(
			`${process.env.REACT_APP_API_URL}/userInfo/dashboard/${loggedInUser?.mobileNumber}`,
			{
			  headers: {
				Authorization: `${loggedInUser?.token}`,
			  },
			}
		  )
		  .then((res) => setPayment(res.data))
		  .catch((err) => console.log(err));
	}
  }, [loggedInUser]);
  //}
  const onSubmit = (data) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/userInfo/payment/${loggedInUser?.mobileNumber}`,
        data,
        {
          headers: {
            Authorization: `${loggedInUser?.token}`,
          },
        }
      )
      .then((res) => {
        window.location.reload();
				toast.success(res?.data?.message);

      })
      .catch((err) => {
        toast.error(res?.data?.message)
      });
  };

  return (
    <Container>
      <h1 className="h3 my-4">Dashboard</h1>
      <Row xs={1} md={4} className="g-4">
        <Col>
          <Card bg="success" text="light">
            <Card.Body>
              <Card.Title>Semester Fee ({payment?.semesterName})</Card.Title>
              <Card.Text>
                {payment?.specificSemesterAmount?.toFixed(2) || 0} ৳
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="primary" text="light">
            <Card.Body>
              <Card.Title>Total Payable</Card.Title>
              <Card.Text>{payment?.totalpayable || 0} ৳</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="danger" text="light">
            <Card.Body>
              <Card.Title>Past Due</Card.Title>
              <Card.Text>{payment?.pastDeu?.toFixed(2) || 0} ৳</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="danger" text="light">
            <Card.Body>
              <Card.Title>Total Due</Card.Title>
              <Card.Text>{payment?.due?.toFixed(2) || 0} ৳</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="col-md-4 mt-4 mx-auto">
        <PaymentForm onSubmit={onSubmit} />
      </div>
    </Container>
  );
};

export default Dashboard;
