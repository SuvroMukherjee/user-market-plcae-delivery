import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../Api/api";
import { toast } from "react-toastify";
import newlogo from "../../assets/images/zoofilogo.png";

const VerifyEmail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const verifyNowHandler = async () => {
    let res = await verifyEmail(userId);
    console.log(res);
    if (res?.data?.error == false) {
      toast.success("Email is now verified.Continue with login");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div>
      <Container className="p-5 d-flex justify-content-center align-items-center h-100">
        <Row>
          <Col>
            <Card style={{ width: "28rem" }}>
              <Card.Body className="text-center">
                <Card.Title className="text-center">
                  <img src={newlogo} alt="logo" width={120} />
                </Card.Title>
                <Card.Text className="mt-4">
                  Thanks for signing up for Zoofi
                </Card.Text>
                <Card.Text>
                  Please click the button to verify your email address and
                  active your account
                </Card.Text>
                <Button onClick={() => verifyNowHandler()} size="sm">
                  Verify Email
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyEmail;
