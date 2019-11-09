import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import OTIFBlock from '../replineshment-map/pages/OTIF/OTIFBlock';
import GlobalFilter from '../replineshment-map/filter/globalFilter';
import CustomerShipment from '../customer-shipment-map/customerShipment';
import Home from '../home/home';
import DioDfcLocation from '../dio-dfc-location/dioDfcLocation';

class PageContainer extends Component {
  render() {
    return (
      <div className="containers padd-left-8 padd-right-8" id="container">
        <div className="body">
          <Switch>
            <Route path="/replenishment">
              <OTIFBlock selectedThresoldValue="30" />
            </Route>
            <Route path="/filter">
              <GlobalFilter />
            </Route>
            <Route path="/customerShipment">
              <CustomerShipment />
            </Route>
            <Route path="/dioDfcLocation">
              <DioDfcLocation />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default PageContainer;
