import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../store/actions/userAction';
import { ReactComponent as DashboardBackground } from '../../assets/images/dashboard.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/logout.svg';
import { Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AccountBox from '../AccountBox';

const Dashboard = ({
  user,
  dispatch,
  logout
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  let navigate = useNavigate();

  const handleLogout = () => dispatch(logout({
    callback: () => navigate("/login", { replace: true })
  }))

  return (
    <Container
      fluid
    >
      <Row>
        <Dropdown
          isOpen={openMenu}
          toggle={() => setOpenMenu(!openMenu)}
        >
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={openMenu}
            className="d-flex align-items-center justify-content-end"
            style={{ cursor: 'pointer' }}
          >
            <AccountBox
              user={user}
            />
          </DropdownToggle>

          <DropdownMenu
            end
            className="mx-4"
          >
            <DropdownItem
              className="d-flex align-items-center justify-content-end"
              onClick={handleLogout}
            >
              <span className="mx-2">Logout</span>
              <LogoutIcon />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Row>

      <Row className="bg-light d-flex align-items-center justify-content-center p-5 pb-0" style={{ minHeight: '100vh' }}>
        <h3 className="text-center p-5">Welcome to Demo App</h3>
        <DashboardBackground/>
        <p className="pt-5">COPYRIGHT © 2020</p>
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
  logout
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
