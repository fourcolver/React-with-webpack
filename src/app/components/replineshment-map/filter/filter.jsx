import React, { Component } from 'react';
import FilterItem from './filterItem';
import FilterProperties from './filterProperties';

class Filter extends Component {
  state = {
    filterData: [
      {
        name: 'Calender Day',
        _id: 1,
        type: 'date',
        value: {
          startDate: '08/12/2019',
          endDate: '11/24/2019',
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
            name: 'Abhijit',
            _id: 'c1',
            isChecked: true,
          },
          {
            name: 'Arijit',
            _id: 'c2',
            isChecked: false,
          },
          {
            name: 'Chandra',
            _id: 'c3',
            isChecked: true,
          },
          {
            name: 'Sekhar',
            _id: 'c4',
            isChecked: true,
          },
          {
            name: 'Shiva Venkata',
            _id: 'c5',
            isChecked: true,
          },
          {
            name: 'Venkata Shivaraman',
            _id: 'c6',
            isChecked: true,
          },
          {
            name: 'Venkat',
            _id: 'c7',
            isChecked: true,
          },
          {
            name: 'Illa Chandra Bhagat',
            _id: 'c8',
            isChecked: true,
          },
          {
            name: 'Chandra Sekharn',
            _id: 'c9',
            isChecked: true,
          },
          {
            name: 'Charndra Sekhar',
            _id: 'c10',
            isChecked: true,
          },
          {
            name: 'Illa Bhagat',
            _id: 'c11',
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
    activePopId: '',
  };

  handleTogglePopup = (properties, event) => {
    let { isPopVisible, activePopId } = { ...this.state };

    if (!isPopVisible) {
      isPopVisible = !isPopVisible;
      activePopId = properties._id;
      this.setState({ isPopVisible, activePopId });
      this.filterProps = properties;
    } else if (isPopVisible && activePopId === properties._id) {
      isPopVisible = !isPopVisible;
      activePopId = '';
      this.setState({ isPopVisible, activePopId });
      this.filterProps = properties;
    } else if (isPopVisible && activePopId !== properties._id) {
      isPopVisible = !isPopVisible;
      activePopId = properties._id;
      this.setState({ isPopVisible, activePopId }, () => {
        isPopVisible = true;
        this.setState({ isPopVisible, activePopId });
        this.filterProps = properties;
      });
    }
  };

  render() {
    const { filterData, isPopVisible } = { ...this.state };
    return (
      <div
        className={
          this.props.filterToggle
            ? 'filter-wrapper scroll-in-right'
            : 'filter-wrapper'
        }
        id="filterWrapper"
      >
        <div className="wrapper">
          {filterData.map(item => (
            <FilterItem
              itemData={item}
              onHandleTogglePopup={this.handleTogglePopup}
              key={item._id}
            />
          ))}
        </div>
        {isPopVisible && <FilterProperties filterProps={this.filterProps} />}
      </div>
    );
  }
}

export default Filter;
