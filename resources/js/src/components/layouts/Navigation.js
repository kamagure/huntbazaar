import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

  return (
    <nav className="navbar sticky-top shadow navbar-expand-sm navbar-light bg-light">
      <a className="navbar-brand text-uppercase">{process.env.MIX_APP_NAME}</a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" data-toggle="tab">
            <Link className="nav-link" to={`/dashboard`}>DASHBOARD <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item" data-toggle="tab">
            <Link className="nav-link" to={`/guest/list`}>GUEST LIST</Link>
          </li>
          <li className="nav-item" data-toggle="tab">
            <Link className="nav-link" to={`/setting`}>SETTING</Link>
          </li>
        </ul>

        <ul className="navbar-nav mr-3 ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              LOGOUT
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <div className="dropdown-item" href="#">Super Admin</div>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/logout">Logout</Link>
            </div>
          </li>
        </ul>

      </div>
    </nav>
  );
}
 
export default Navigation;