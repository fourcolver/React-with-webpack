import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import filterImg from '../../../assets/images/thumb-filter-image.jpg';
import replenishmentImg from '../../../assets/images/replenishment_map.png';
import diodfcLocationImg from '../../../assets/images/dio_dfc_location.png';
import customerShipmentImg from '../../../assets/images/customer_shipment.png';
import workbookImg from '../../../assets/images/workbook_content_type.svg';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className="landing-block-heder"></div>
        <div className="full-width hack2">
          <img
            src={workbookImg}
            width="35"
            style={{
              marginRight: '10px',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
            alt=""
          />
          NA Performance Management Engine
        </div>
        <div className="full-width">
          <div className="landing-block">
            <Link to="/filter">
              <div className="inner">
                <div className="landing-block-heading">Filter</div>
                <div className="landing-block-content">
                  <img src={filterImg} className="image-responsive" />
                </div>
              </div>
            </Link>
          </div>
          <div className="landing-block">
            <Link to="/replenishment">
              <div className="inner">
                <div className="landing-block-heading">Replenishment Map</div>
                <div className="landing-block-content">
                  <img src={replenishmentImg} className="image-responsive" />
                </div>
              </div>
            </Link>
          </div>
          <div className="landing-block">
            <Link to="/customerShipment">
              <div className="inner">
                <div className="landing-block-heading">
                  Customer Shipment Map
                </div>
                <div className="landing-block-content">
                  <img src={customerShipmentImg} className="image-responsive" />
                </div>
              </div>
            </Link>
          </div>
          <div className="landing-block">
            <Link to="/dioDfcLocation">
              <div className="inner">
                <div className="landing-block-heading">DIO/DFC Location</div>
                <div className="landing-block-content">
                  <img src={diodfcLocationImg} className="image-responsive" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
