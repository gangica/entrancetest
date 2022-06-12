import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/actions/userAction';
import Form from '../Form';

const Login = ({ 
  loading, 
  dispatch, 
  setLoading 
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

  return (
    <div className="App">
      <h1>Login Bro {loading.toString()}</h1>

      <Form 
        fields={formFields}
        submitText="Login"
      />
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <button
        onClick={() => dispatch(setLoading(!loading))}
      >
        Login
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
