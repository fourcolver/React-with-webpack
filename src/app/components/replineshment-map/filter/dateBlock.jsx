import React, { Component, Fragment } from 'react';

class DateBlock extends Component {
  render() {
    const { startDate, endDate } = { ...this.props.blockData.value };
    return (
      <Fragment>
        <div
          className="startDate"
          onClick={() => {
            this.props.onHandleTogglePopup(this.props.blockData);
          }}
        >
          <span className="icon-calendar font-size-18 inline margin-right-2"></span>
          <span className="inline">{startDate}</span>
        </div>
        <div
          className="startDate"
          onClick={() => this.props.onHandleTogglePopup(this.props.blockData)}
        >
          <span className="icon-calendar font-size-18 inline margin-right-2"></span>
          <span className="inline">{endDate}</span>
        </div>
      </Fragment>
    );
  }
}

export default DateBlock;
