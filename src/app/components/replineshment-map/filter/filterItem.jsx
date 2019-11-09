import React, { Component } from 'react';
import CheckBoxListBlock from './checkBoxListBlock';
import DateBlock from './dateBlock';

class FilterItem extends Component {
  render() {
    const { itemData: item, onHandleTogglePopup } = { ...this.props };
    return (
      <div className="filter-block">
        <h3>{item.name}</h3>
        {item.type === 'date' && (
          <DateBlock
            blockData={item}
            onHandleTogglePopup={onHandleTogglePopup}
          />
        )}
        {item.type === 'select_option' && (
          <CheckBoxListBlock
            blockData={item}
            onHandleTogglePopup={onHandleTogglePopup}
          />
        )}
        {item.type === 'checkbox_list' && (
          <CheckBoxListBlock
            blockData={item}
            onHandleTogglePopup={onHandleTogglePopup}
          />
        )}
      </div>
    );
  }
}

export default FilterItem;
