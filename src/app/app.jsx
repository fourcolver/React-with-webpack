import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import DefaultHeader from './components/common/defaultHeader';
import PageList from './components/common/pageList';
import PageContainer from './components/common/pageContainer';
import Filter from './components/replineshment-map/filter/filter';

import Home from './components/home/home';

import './app.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    isPageListVisible: false,
    isFilterVisible: false,
    OTIFBusinessGroupData: 0,
  };

  handlePagelistToggle = () => {
    let { isPageListVisible } = { ...this.state };
    isPageListVisible = !isPageListVisible;
    this.setState({ isPageListVisible });
  };

  handleFilterListToggle = () => {
    let { isFilterVisible } = { ...this.state };
    isFilterVisible = !isFilterVisible;
    this.setState({ isFilterVisible });
  };

  handleUpdateOTIFBusinessGroupData = OTIFB_Data => {
    console.log(OTIFB_Data);
  };

  render() {
    const { isPageListVisible, isFilterVisible } = { ...this.state };
    return (
      <Fragment>
        <Router>
          <DefaultHeader
            toggle={isPageListVisible}
            onHandlePageToggle={this.handlePagelistToggle}
            onHandleFilterToggle={this.handleFilterListToggle}
            {...this.props}
          />
          <PageList
            toggle={isPageListVisible}
            onHandlePageToggle={this.handlePagelistToggle}
          />
          <PageContainer />
          <Filter
            filterToggle={isFilterVisible}
            onFilterUpdate={this.handleUpdateOTIFBusinessGroupData}
          />
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        {/* <DefaultHeader
          toggle={isPageListVisible}
          onHandlePageToggle={this.handlePagelistToggle}
          onHandleFilterToggle={this.handleFilterListToggle}
          {...this.props}
        />
        <PageList
          toggle={isPageListVisible}
          onHandlePageToggle={this.handlePagelistToggle}
        />
        <PageContainer />
        <Filter
          filterToggle={isFilterVisible}
          onFilterUpdate={this.handleUpdateOTIFBusinessGroupData}
        /> */}
      </Fragment>
    );
  }
}

export default App;
