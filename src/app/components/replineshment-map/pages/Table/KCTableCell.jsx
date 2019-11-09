import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import TableCell from '@material-ui/core/TableCell';

import propTypes from 'prop-types';
import { tsParenthesizedType } from '@babel/types';

class KCTableCell extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: props,
    };
    this.captureRowInformation = this.captureRowInformation.bind(this);
    this.captureCellInformation = this.captureCellInformation.bind(this);
    // this.captureCellInformation = this.captureCellInformation.bind(this);

    this.tableCellToolTip = React.createRef();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps != this.props) {
      //you can use this or below
      // this.setState({ options: {
      //      ...this.state.options,
      //     rowObject: nextProps.rowObject,
      //     rowIndex:nextProps.rowIndex,
      //     columnData:nextProps.columnData,
      //     styleObject:nextProps.styleObject,
      //     cellData:nextProps.cellData,
      //     cellProperty:nextProps.cellProperty }
      // });
      this.setState({ options: nextProps });
    }
  }

  captureRowInformation(ele) {
    this.state.options.onRowClick(ele);
  }

  captureCellInformation(ele) {
    this.state.options.onCellClick(ele);
  }

  handleMouseEnter = (ele, event) => {
    if (this.tableCellToolTip.current) {
      this.tableCellToolTip.current.classList.toggle('show');
    }
  };

  handleMouseLeave = (ele, event) => {
    if (this.tableCellToolTip.current) {
      this.tableCellToolTip.current.classList.toggle('show');
    }
  };

  render() {
    console.log(this.state.options.rowObject);
    console.log(this.state.options);
    let toolTipContent = '';
    if (this.state.options.tableName === 'OTIFBusinessGroup') {
      toolTipContent = (
        <div className="inline" style={{ width: '100%' }}>
          <div className="heading">PH3 - Business Group</div>
          <div className="data">
            {this.state.options.rowObject.BUSINESS_GROUP}
          </div>
        </div>
      );
    } else if (this.state.options.tableName === 'OTIFSKUBlock') {
      toolTipContent = (
        <div className="inline" style={{ width: '100%' }}>
          <div className="heading">PH3 - Business Group</div>
          <div className="data">
            {this.state.options.rowObject.BUSINESS_GROUP}
          </div>
        </div>
      );
    }

    return (
      <Fragment>
        {this.state.options.columnIndex == 0 ? (
          <TableCell
            component="td"
            scope="row"
            highlight={`row${this.state.options.rowIndex}`}
            row-data={this.state.options.rowObject}
            onMouseEnter={ele => this.handleMouseEnter(ele)}
            onMouseLeave={ele => this.handleMouseLeave(ele)}
            onClick={ele => this.captureRowInformation(ele)}
          >
            {this.state.options.columnData.toLocaleString()}
            {/* <span >{this.state.options.columnData}</span> */}
          </TableCell>
        ) : (
          <TableCell
            component="td"
            custom-cell={`cell-${this.state.options.columnIndex}-${this.state.options.rowIndex}`}
            custom-row={`row${this.state.options.rowIndex}`}
            custom-col={`cus-col-${this.state.options.columnIndex}`}
            style={this.state.options.styleObject}
            row-data={this.state.options.rowObject}
            cell-data={this.state.options.cellData}
            cell-property={this.state.options.cellProperty}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={ele => this.captureCellInformation(ele)}
          >
            {this.state.options.columnData.toLocaleString()}
            <div className="tableCellToolTip" ref={this.tableCellToolTip}>
              {
                toolTipContent
                // `Ph3 - Business Group: ${this.state.options.rowObject.BUSINESS_GROUP}`
              }
            </div>
          </TableCell>
        )}
      </Fragment>
    );
  }
}

KCTableCell.propTypes = {
  rowIndex: propTypes.number.isRequired,
  columnIndex: propTypes.number.isRequired,
  columnData: propTypes.oneOfType([propTypes.string, propTypes.number]),
  cellData: propTypes.oneOfType([propTypes.string, propTypes.number]),
  cellProperty: propTypes.string.isRequired,
  styleObject: propTypes.object,
  styleRowIndex: propTypes.number,
  rowObject: propTypes.object.isRequired,
  onRowClick: propTypes.func.isRequired,
  onCellClick: propTypes.func.isRequired,
  tableName: propTypes.string.isRequired,
};

export default KCTableCell;
