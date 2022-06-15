import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { signup } from "../../store/actions/userAction";
import Form from '../Form';
import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as SignupBackground } from '../../assets/images/signup.svg';

const Signup = ({ dispatch, signup }) => {
  const formFields = [
    {
      id: "firstName",
      title: "First Name",
      placeholder: "First name"
    },
    {
      id: "lastName",
      title: "Last Name",
      placeholder: "Last name"
    },
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
      placeholder: "Password",
      isValidated: true
    }
  ]

  let navigate = useNavigate();

  const submit = (data) => dispatch(
    signup(data, {
      callback: () => navigate("/", { replace: true })
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
          <SignupBackground />
        </Col>
        <Col md="4" lg="4" className="d-flex align-items-center">
          <Form
            fields={formFields}
            header={(
              <div className="mb-2">
                <h3>Adventure starts here</h3>
                <p>Make your app management easy and fun!</p>
              </div>
            )}
            footer={(
              <h6 className="my-3 text-center">
                <span>Already have an account? </span> 
                <Link to="/login">
                  Sign in instead
                </Link>
              </h6>
            )}
            submitText="Signup"
            submit={submit}
          />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  signup
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
