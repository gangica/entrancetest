import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/userAction';
import Form from '../Form';
import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as LoginBackground } from '../../assets/images/login.svg';

const Login = ({
  user,
  loading,
  dispatch,
  login
}) => {
  const [callbackError, setCallbackError] = useState("");

  const formFields = [
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Email"
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Password"
    }
  ]

  let navigate = useNavigate();

  const submit = (data) => dispatch(
    login(data, {
      callback: () => navigate("/", { replace: true }),
      callbackFail: (message) => setCallbackError(message)
    })
  );

  return (
    <Container 
      fluid
    >
      <Row>
        <Col 
          md="8" 
          lg="8" 
          className="bg-light d-flex align-items-center justify-content-center p-5"
          style={{ minHeight: '100vh' }}
        >
          <LoginBackground />
        </Col>
        <Col md="4" lg="4" className="d-flex align-items-center">
          <Form
            fields={formFields}
            header={(
              <div className="mb-2">
                <h3>Welcome to ReactJS Test Interview!</h3>
                <p>Please sign-in to your account and start the adventure</p>
              </div>
            )}
            footer={(
              <h6 className="my-3 text-center">
                <span>New on our platform? </span>
                <Link to="/signup">
                  Create an account
                </Link>
              </h6>
            )}
            submitText="Login"
            submit={submit}
            callbackError={callbackError}
          />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  login
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
