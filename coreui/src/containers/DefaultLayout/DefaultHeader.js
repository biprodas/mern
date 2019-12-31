import React, { Component } from 'react';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import profile from '../../assets/img/biprodas.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  state ={
    noties: [{_id: 1, details: "Two mules for sister sara"}],
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { noties } = this.state;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 140, height: 30, alt: 'Semicolon Logo' }}
          minimized={{ src: logo, width: 130, height: 30, alt: 'Semicolon Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <button className="btn btn-sm btn-primary">Reports</button>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-envelope-letter"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="icon-bell"></i><Badge pill color="danger">{noties.length}</Badge>            
            </DropdownToggle>
            {/* <DropdownMenu right>
              { noties.map(noty => <DropdownItem key={noty._id} className="font-weight-bold h6">
                  <Link className="" target="_blank" to="/">
                    <span className="badge badge-light">{moment(noty.date).format("DD/MM/YYYY")}</span>
                    <span className="text-warning text-dark p-1 rounded mx-2">{noty.details}</span>
                  </Link>
                </DropdownItem>) }
              
            </DropdownMenu> */}
          </UncontrolledDropdown>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={profile} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <Link to="/profile/me" className="text-decoration-none"><DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem></Link>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className="d-md-down-none">
            <i className="flag-icon flag-icon-bd"></i>
          </NavItem>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
