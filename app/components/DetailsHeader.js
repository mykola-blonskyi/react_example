import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Dropdown, MenuItem } from 'react-bootstrap';

import Auth from '../modules/Auth';

export default class DetailsHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { full_name: Auth.getFullName() };

    this.logout = this.logout.bind(this);
  }

  logout(e){
    hashHistory.push('/login');
  }

  render() {
    return (
      <header className="container-fluid projects_header_wrapper">
        <div className="row">
          <div className="small_logo_wrapper col-lg-10 col-md-10">
            <Link to="projects">
              <img src="./images/grafik-assets/logo-small.svg" alt="Ecoglobe Building Optimizer" /> all projects
            </Link>
          </div>

          <div className="user_wrapper col-md-2 col-lg-2">
            <Dropdown id="dropdown-custom-1" pullRight>
              <Dropdown.Toggle>{this.state.full_name}</Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <MenuItem eventKey="1">Profile Settings</MenuItem>
                <MenuItem eventKey="2" onClick={this.logout}>
                  Logout
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 page_title">Apple Campus</div>
        </div>
      </header>
    );
  }
}
