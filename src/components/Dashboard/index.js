import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../store/actions/userAction';

const Dashboard = ({
  loading,
  user,
  dispatch,
  logout
}) => {
  console.log(user)
  const { displayName, email } = user;

  let navigate = useNavigate();

  const handleLogout = () => dispatch(logout({
    callback: () => navigate("/login", { replace: true })
  }))

  return (
    <div className="App">
      <h1>Dashboard Bro {loading.toString()}</h1>
      <div>
        <p>Display name: {displayName}</p>
        <p>Email: {email}</p>
      </div>
      <button onClick={handleLogout}>
        Logout
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
  logout
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
