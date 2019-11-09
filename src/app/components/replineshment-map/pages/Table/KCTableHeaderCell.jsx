import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';

import propTypes from 'prop-types';

import TableSortLabel from '@material-ui/core/TableSortLabel';

class KCTableHeaderCell extends React.Component {
  constructor(props) {
    super();

    this.state = {
      options: props,
    };

    this.captureColumnInformation = this.captureColumnInformation.bind(this);
  }

  captureColumnInformation(ele) {
    this.state.options.onColumnClick(ele);
  }

  render() {
    // console.log(this.props,"heasder cell")
    const { classes, order, orderBy, onRequestSort } = this.props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
    return (
      <Fragment>
        {this.state.options.columnIndex == 0 ? (
          <TableCell component="th" style={this.state.options.styleObject}>
            {this.state.options.columnData}
          </TableCell>
        ) : (
          // <TableCell component="th" style={this.state.options.styleObject}
          // highlight={"cus-col-" +  this.state.options.columnIndex }
          // onClick={(ele) => this.captureColumnInformation(ele)}>
          // {this.state.options.columnData}
          // </TableCell>

          <TableCell
            component="th"
            style={this.state.options.styleObject}
            highlight={'cus-col-' + this.state.options.columnIndex}
            onClick={ele => this.captureColumnInformation(ele)}
            align={this.props.propertyName['numeric'] ? 'left' : 'right'}
            padding={
              this.props.propertyName['disablePadding'] ? 'none' : 'default'
            }
            sortDirection={
              orderBy === this.props.propertyName.id ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === this.props.propertyName['id']}
              direction={order}
              onClick={createSortHandler(this.props.propertyName['id'])}
            >
              {this.state.options.columnData}
              {orderBy === 'id' ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )}
      </Fragment>
    );
  }
}

KCTableHeaderCell.propTypes = {
  columnIndex: propTypes.number.isRequired,
  columnData: propTypes.string.isRequired,
  styleObject: propTypes.object,
  onColumnClick: propTypes.func.isRequired,
  order: propTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: propTypes.string.isRequired,
  onRequestSort: propTypes.func.isRequired,
  classes: propTypes.object.isRequired,
  propertyName: propTypes.object.isRequired,
};

export default KCTableHeaderCell;
