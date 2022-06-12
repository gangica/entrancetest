import React from 'react';
import Form from '../Form';

const Signup = () => {
  const formFields = [
    {
      id: "firstname",
      title: "First Name",
      placeholder: "First name"
    },
    {
      id: "lastname",
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

  return (
    <div className="App">
      <h1>Signup Bro</h1>

      <Form
        fields={formFields}
        submitText="Signup"
      />
    </div>
  );
}

export default Signup;
