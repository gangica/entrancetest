import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { signup } from "../../store/actions/userAction";
import Form from '../Form';

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
    <div className="App">
      <h1>Signup Bro</h1>

      <Form
        fields={formFields}
        submitText="Signup"
        submit={submit}
      />
    </div>
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
