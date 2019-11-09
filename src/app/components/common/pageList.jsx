import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PageList extends Component {
  render() {
    return (
      <div
        className={this.props.toggle ? 'tabs scroll-in-left' : 'tabs'}
        id="tabWrapper"
      >
        <ul className="tab-list invisible-in-small" id="tabList">
          <li onClick={this.props.onHandlePageToggle}>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li onClick={this.props.onHandlePageToggle}>
            <NavLink to="/filter">Filters</NavLink>
          </li>
          <li onClick={this.props.onHandlePageToggle}>
            <NavLink to="/replenishment">Replenishment Map</NavLink>
          </li>
          <li onClick={this.props.onHandlePageToggle}>
            <NavLink to="/customerShipment">Customer Shipment Map</NavLink>
          </li>
          <li onClick={this.props.onHandlePageToggle}>
            <NavLink to="/dioDfcLocation">DIO/DFC Location</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default PageList;
