import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class FilterProperties extends Component {
  state = {
    filterProps: this.props.filterProps.properties,
    startDate: new Date(this.props.filterProps.value.startDate),
    endDate: new Date(this.props.filterProps.value.endDate),
    searchValue: '',
  };

  initialState = JSON.parse(JSON.stringify(this.props.filterProps.properties));

  handleChange = id => {
    const { filterProps } = { ...this.state };
    const index = filterProps.findIndex(prop => prop._id === id);
    // eslint-disable-next-line dot-notation
    filterProps[index]['isChecked'] = !filterProps[index]['isChecked'];
    this.setState({ filterProps });
  };

  handleSelectChange = event => {
    alert(event.target.value);
  };

  handleSearhChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleApply = () => {
    alert(JSON.stringify(this.state.filterProps));
  };

  handleCancel = () => {
    const filterProps = JSON.parse(JSON.stringify(this.initialState));
    this.setState({ filterProps }, () => console.log(this.initialState));
  };

  handleAllToggle = () => {
    console.log('all');
  };

  handleStartDateChange = date => {
    let { startDate } = { ...this.state };
    startDate = date;
    this.setState({ startDate });
  };

  handleEndDateChange = date => {
    let { endDate } = { ...this.state };
    endDate = date;
    this.setState({ endDate });
  };

  render() {
    const { filterProps } = { ...this.props };
    console.log(filterProps.value);
    const checkboxList = this.state.filterProps
      .filter(
        data =>
          this.state.searchValue === '' ||
          data['name']
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase()),
      )
      .map(item => (
        <li key={item._id}>
          <input
            id={item._id}
            className="inline"
            type="checkbox"
            value={item.name}
            checked={item.isChecked ? 'checked' : ''}
            onChange={() => this.handleChange(item._id)}
          />
          <label htmlFor={item._id} className="inline">
            {' '}
            {item.name}{' '}
          </label>
        </li>
      ));

    const selectOptions = this.state.filterProps.map(item => (
      <option key={item._id} value={item.name}>
        {item.name}
      </option>
    ));

    return (
      <div id="filterDetailsWrapper" className="filter-details-wrapper visible">
        <header>{filterProps.name}</header>

        {filterProps.type === 'checkbox_list' && (
          <Fragment>
            <div className="filter-option-search-wrapper">
              <input
                autoComplete="off"
                type="search"
                placeholder="Search ..."
                id="searchAutoComplete"
                onChange={this.handleSearhChange}
              />
            </div>
            <ul>
              <li>
                <input
                  id="itemAll"
                  className="inline"
                  type="checkbox"
                  value="item1"
                  onChange={this.handleAllToggle}
                  checked={
                    filterProps.value.toLowerCase() === 'all' ? 'checked' : ''
                  }
                />
                <label htmlFor="itemAll" className="inline">
                  {' '}
                  All{' '}
                </label>
              </li>
            </ul>
            <ul className="check-box-list">{checkboxList}</ul>
          </Fragment>
        )}

        {filterProps.type === 'select_option' && (
          <div className="filter-selctet-option-wrapper">
            <select
              value={this.state.filterProps.value}
              onChange={this.handleSelectChange}
            >
              {' '}
              {selectOptions}{' '}
            </select>
          </div>
        )}

        {filterProps.type === 'date' && (
          <div className="filter-date-wrapper">
            <div className="half">
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDateChange}
                selectsStart
              />
            </div>
            <div className="half">
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndDateChange}
                selectsEnd
              />
            </div>
          </div>
        )}

        <div className="filter-option-buttons-wrapper">
          <div className="button" onClick={this.handleApply}>
            {' '}
            Apply{' '}
          </div>
          <div className="button" onClick={this.handleCancel}>
            {' '}
            Cancel{' '}
          </div>
        </div>
      </div>
    );
  }
}

export default FilterProperties;
