import React, { Component } from 'react';

class CheckBoxListBlock extends Component {
  state = {};

  render() {
    const { blockData } = { ...this.props };

    return (
      <div
        className="drop-box pointer"
        id={blockData.name}
        onClick={event => {
          this.props.onHandleTogglePopup(blockData, event);
        }}
      >
        <span>{blockData.value}</span>
        <span className="icon-chevron-down font-size-18 down-arrow"></span>
      </div>
    );
  }
}

export default CheckBoxListBlock;
