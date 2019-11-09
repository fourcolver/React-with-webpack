import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo-kc.png';
import helpLogo from '../../../assets/images/help.png';

class DefaultHeader extends Component {
  state = {
    isRegionListVissible: false,
    tabSearchValue: '',
    tabs: [
      { Home: '/' },
      { Filters: '/filter' },
      { 'Replenishment Map': '/replenishment' },
      { 'Customer Shipment Map': '/customerShipment' },
      { 'DIO/DFC Location': 'dioDfcLocation' },
    ],
  };

  handleRegionListToggle = () => {
    let { isRegionListVissible } = { ...this.state };
    isRegionListVissible = !isRegionListVissible;
    this.setState({
      isRegionListVissible,
    });
  };

  handleSearchChange = event => {
    let { tabSearchValue } = { ...this.state };
    tabSearchValue = event.currentTarget.value;
    this.setState({ tabSearchValue });
  };

  handleSearchTabClick = () => {
    let { tabSearchValue } = { ...this.state };
    tabSearchValue = '';
    this.setState({ tabSearchValue });
  };

  render() {
    const { toggle, onHandlePageToggle, onHandleFilterToggle } = {
      ...this.props,
    };
    // this.state.tabs.map(tab => console.log(Object.keys(tab)[0]));
    return (
      <header className="default-header">
        <div className="panels blue-panel">
          <div className="logo inline">
            <Link to="/">
              <img src={logo} alt="KC" /> <span className="inline">PME</span>
            </Link>
          </div>
          <div
            className="toggle-dropdown-button margin-right-10"
            onClick={this.props.onHandlePageToggle}
            id="tabsToggle"
          >
            <span
              className="icon-arrow-down inline"
              style={{ fontSize: '21px' }}
            ></span>
          </div>
          <div className="search-wrapper inline ">
            <div className="search-container" id="searchBar">
              <span className="icon-search font-size-16 inline"></span>
              <input
                type="text"
                className="search-bar expanded-text-07"
                placeholder="Dashboard search..."
                onChange={this.handleSearchChange}
                value={this.state.tabSearchValue}
              />
              <ul
                className={
                  this.state.tabSearchValue !== ''
                    ? 'tabs-dropdown-from-search'
                    : 'tabs-dropdown-from-search hidden'
                }
              >
                {this.state.tabs
                  .filter(
                    tab =>
                      this.state.tabSearchValue === '' ||
                      Object.keys(tab)[0]
                        .toLowerCase()
                        .startsWith(this.state.tabSearchValue.toLowerCase()),
                  )
                  .map((tab, index) => (
                    <li key={index} onClick={this.handleSearchTabClick}>
                      <Link to={Object.values(tab)[0]}>
                        {Object.keys(tab)[0]}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="dashboard-name">
            Replenishment Map
            <div
              className="dashboard-data-type inline pointer"
              onClick={this.handleRegionListToggle}
            >
              <span className="inline margin-right-6 expanded-text-07">NA</span>
              <span className="icon-arrow-down-circle inline  font-size-16"></span>
              <ul
                className={
                  this.state.isRegionListVissible
                    ? 'dashboard-data-type-list visible'
                    : 'dashboard-data-type-list'
                }
              >
                <li className="active">NA</li>
                <li>APAC</li>
                <li>EMEA</li>
                <li>All Region</li>
              </ul>
            </div>
          </div>
          <div className="float-right header-right-tool">
            <div
              className="toggle-dropdown-button"
              id="filtersToggle"
              onClick={this.props.onHandleFilterToggle}
            >
              <span className="icon-filter font-size-24"></span>
            </div>
            <div className="inline header-help pointer">
              <img src={helpLogo} alt="" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default DefaultHeader;
