import React, { Component, Fragment } from 'react';
import FilterItem from './filterItem';
import FilterProperties from './filterProperties';

class GlobalFilter extends Component {
  state = {
    filterData: [
      {
        name: 'Calender Day',
        _id: 1,
        type: 'date',
        value: {
          startDate: '2-09-2019',
          endDate: '12-10-2019',
        },
        properties: [],
      },
      {
        name: 'Unit of Measurement',
        _id: 2,
        type: 'select_option',
        value: 'Global Standard Units',
        properties: [
          {
            name: 'Activity Unit',
            _id: 'b1',
            isChecked: false,
          },
          {
            name: 'Cases/Equivalent Cases',
            _id: 'b2',
            isChecked: false,
          },
          {
            name: 'Cubic Meters',
            _id: 'b3',
            isChecked: false,
          },
          {
            name: 'Global Standard Units',
            _id: 'b4',
            isChecked: true,
          },
        ],
      },
      {
        name: 'SNP Planner',
        _id: 3,
        type: 'checkbox_list',
        value: 'Multiselect',
        properties: [
          {
            name: 'name of c1',
            _id: 'c1',
            isChecked: true,
          },
          {
            name: 'name of c2',
            _id: 'c2',
            isChecked: false,
          },
          {
            name: 'name of c3',
            _id: 'c3',
            isChecked: true,
          },
          {
            name: 'name of c4',
            _id: 'c4',
            isChecked: true,
          },
          {
            name: 'name of c5',
            _id: 'c5',
            isChecked: true,
          },
        ],
      },
      {
        name: 'EMEA MPS Group',
        _id: 4,
        type: 'checkbox_list',
        value: 'All',
        properties: [
          {
            name: 'name of d1',
            _id: 'd1',
            isChecked: true,
          },
          {
            name: 'name of d2',
            _id: 'd2',
            isChecked: true,
          },
          {
            name: 'name of d3',
            _id: 'd3',
            isChecked: true,
          },
          {
            name: 'name of d4',
            _id: 'd4',
            isChecked: true,
          },
          {
            name: 'name of d5',
            _id: 'd5',
            isChecked: true,
          },
        ],
      },
      {
        name: 'Business Group Total',
        _id: 5,
        type: 'checkbox_list',
        value: 'All',
        properties: [
          {
            name: 'name of e1',
            _id: 'e1',
            isChecked: true,
          },
          {
            name: 'name of e2',
            _id: 'e2',
            isChecked: true,
          },
          {
            name: 'name of e3',
            _id: 'e3',
            isChecked: true,
          },
          {
            name: 'name of e4',
            _id: 'e4',
            isChecked: true,
          },
          {
            name: 'name of e5',
            _id: 'e5',
            isChecked: true,
          },
        ],
      },
      {
        name: 'PH01 Segment',
        _id: 6,
        type: 'checkbox_list',
        value: 'All',
        properties: [
          {
            name: 'name of f1',
            _id: 'f1',
            isChecked: true,
          },
          {
            name: 'name of f2',
            _id: 'f2',
            isChecked: true,
          },
          {
            name: 'name of f3',
            _id: 'f3',
            isChecked: true,
          },
          {
            name: 'name of f4',
            _id: 'f4',
            isChecked: true,
          },
          {
            name: 'name of f5',
            _id: 'f5',
            isChecked: true,
          },
        ],
      },
      {
        name: 'PH03 Business Group',
        _id: 7,
        type: 'checkbox_list',
        value: 'All',
        properties: [
          {
            name: 'name of G1',
            _id: 'G1',
            isChecked: true,
          },
          {
            name: 'name of G2',
            _id: 'G2',
            isChecked: true,
          },
          {
            name: 'name of G3',
            _id: 'G3',
            isChecked: true,
          },
          {
            name: 'name of G4',
            _id: 'G4',
            isChecked: true,
          },
          {
            name: 'name of G5',
            _id: 'G5',
            isChecked: true,
          },
        ],
      },
      {
        name: 'PH06 Brand Category',
        _id: 8,
        value: 'All',
        type: 'checkbox_list',
        properties: [
          {
            name: 'name of H1',
            _id: 'H1',
            isChecked: true,
          },
          {
            name: 'name of H2',
            _id: 'H2',
            isChecked: true,
          },
          {
            name: 'name of H3',
            _id: 'H3',
            isChecked: true,
          },
          {
            name: 'name of H4',
            _id: 'H4',
            isChecked: true,
          },
          {
            name: 'name of H5',
            _id: 'H5',
            isChecked: true,
          },
        ],
      },
    ],
    isPopVisible: false,
  };

  handleTogglePopup = properties => {
    this.setState({ isPopVisible: false }, () => {
      this.setState({ isPopVisible: true });
    });
    this.filterProps = properties;
  };

  render() {
    if (this.state.isPopVisible) {
      return (
        <Fragment>
          <div className="inline">
            {this.state.filterData.map(item => (
              <FilterItem
                itemData={item}
                onPopupToggle={this.handleTogglePopup}
                key={item._id}
              />
            ))}
          </div>
          <div className={this.state.isPopVisible ? 'inline' : 'invisible'}>
            <FilterProperties filterProps={this.filterProps} />
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="inline">
          {this.state.filterData.map(item => (
            <FilterItem
              itemData={item}
              onPopupToggle={this.handleTogglePopup}
              key={item._id}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default GlobalFilter;
