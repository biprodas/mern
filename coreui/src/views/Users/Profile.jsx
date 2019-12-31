import React, { Component } from 'react'
import { getCurrentUser } from '../../services/authService';

export default class Profile extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  

  render() {

    const { user } = this.state;

    return (
      <div className="row animated fadeIn">
        <div className="col-md-2"></div>
        <div className="col-md-6 mt-3">
          <div className="p-3 bg-white">
            <table className="table table-sm h5">
              <tbody>
                <tr><td style={{width: "30%"}}>Name</td><td>: {user.name}</td></tr>
                <tr><td>Username</td><td>: {user.username}</td></tr>
                <tr><td>Role</td><td>: {user.isAdmin ? "Admin" : "Guest"}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
