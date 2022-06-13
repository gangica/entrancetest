import React from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/userAction';
import Form from '../Form';

const Login = ({
  user,
  loading,
  dispatch,
  login
}) => {
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
      callback: () => navigate("/", { replace: true })
    })
  );

  return (
    <div className="App">
      <h1>Login Bro {loading.toString()}</h1>
      <p>{user.lastName} - {user.firstName}</p>
      <Form
        fields={formFields}
        submitText="Login"
        submit={submit}
      />
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <button
      >
        Login
      </button>
    </div>
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
