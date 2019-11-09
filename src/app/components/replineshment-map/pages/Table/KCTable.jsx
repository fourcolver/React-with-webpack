import React, { Fragment } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import propTypes from 'prop-types';

import KCTableHeaderCell from './KCTableHeaderCell';
import KCTableCell from './KCTableCell';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

let selectedRecords = [];

class KCTable extends React.Component {
  constructor(props) {
    super();

    this.state = {
      options: props,
      rowsData: props.rows,
      selectedColumnData: [],
      selectedRowData: [],
      selectedCellData: [],
      searchText: '',
      selectedRowIndex: null,
      order: 'asc',
      orderBy: 'BUSINESS_GROUP',
    };

    this.onColumnSelected = this.onColumnSelected.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.onCellSelected = this.onCellSelected.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.applySelectClass = this.applySelectClass.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps != this.props) {
      // you can use this or below

      this.setState({
        options: {
          ...this.state.options,
          rows: nextProps.rows,
        },
      });
    }
  }

  onTableDataSelection(data, type) {
    const selectedData = {
      data,
      type,
    };

    this.state.options.onTableDataSelect(selectedData);
  }

  onColumnSelected(selData, order) {
    console.log('order========', order);
    this.applyRowOrColumnFunctionality(selData, 'col');

    this.setState({
      selectedColumnData: selData,
    });

    this.onTableDataSelection(selData, 'column');
  }

  onRowSelected(selData) {
    // console.log(selData.data.target.getAttribute('highlight').split('row')[1])
    this.applyRowOrColumnFunctionality(selData, 'row');
    this.setState({
      selectedRowData: selData,
      selectedRowIndex: selData.target
        .getAttribute('highlight')
        .split('row')[1],
    });

    this.onTableDataSelection(selData, 'row');
  }

  onCellSelected(selData) {
    console.log(selData);
    this.applyCellSelectionClasses(selData);

    this.setState({
      selectedCellData: selData,
    });

    this.onTableDataSelection(selData, 'cell');
  }

  onSearchTextChange(eve) {
    const filterText = eve.target.value;
    const filterColName = this.state.options.filterColumnName;
    const totalData = this.state.rowsData;

    console.log(totalData);

    if (filterText.length >= 3) {
      let filterdData = totalData.filter(function(filObj) {
        if (filObj[filterColName] != null && filObj[filterColName] != undefined)
          return (
            filObj[filterColName]
              .toLowerCase()
              .indexOf(filterText.toLowerCase()) !== -1
          );
      });
      this.setState(prevState => ({
        options: {
          ...prevState.options,
          rows: filterdData,
        },
      }));

      // this.setState({ options: { ...this.state.options, rows: filterdData } });
    } else {
      this.setState(prevState => ({
        options: {
          ...prevState.options,
          rows: totalData,
        },
      }));
    }
  }

  // Select css Handling

  applyRowOrColumnFunctionality(ele, type) {
    this.clearAppliedClasses();
    const name = ele.target.getAttribute('highlight');
    let recordsToBeHighLight = [];
    const tableName = this.state.options.name;
    const tableObject = document.querySelectorAll(`table[id='${tableName}']`);

    if (type == 'row') {
      recordsToBeHighLight = tableObject[0].querySelectorAll(
        `td[custom-row='${name}']`,
      );
    } else {
      recordsToBeHighLight = tableObject[0].querySelectorAll(
        `td[custom-col='${name}']`,
      );
    }

    this.applyClasses(recordsToBeHighLight);
  }

  applyClasses(records) {
    if (records.length > 0) {
      records.forEach(row => {
        selectedRecords.push(row);
        this.applySelectClass(row);
      });
    }
  }

  applyCellSelectionClasses(ele) {
    this.clearAppliedClasses();
    selectedRecords.push(ele.target);
    this.applySelectClass(ele.target);
  }

  applySelectClass(ele) {
    let existingClasses = ele.getAttribute('class');
    existingClasses = `${existingClasses} conSelected`;
    ele.setAttribute('class', existingClasses.toString());
  }

  clearAppliedClasses(ele) {
    if (selectedRecords.length > 0) {
      selectedRecords.map(row => {
        const existingClasses = row.getAttribute('class').split(' ');
        const eleIndex = existingClasses.findIndex(k => k == 'conSelected');
        existingClasses.splice(eleIndex, 1);
        row.setAttribute('class', existingClasses.join(' '));
      });
    }
  }

  // end

  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === 'desc';
    console.log(property, this.state.orderBy, this.state.order);
    // setOrder(isDesc ? 'asc' : 'desc');
    this.setState({ order: isDesc ? 'asc' : 'desc', orderBy: property });
    // setOrderBy(property);
    //  this.setState({ orderBy: property })
  };

  render() {
    const classes = {
      root: {
        width: '100%',
        marginTop: '3px',
      },
      paper: {
        width: '100%',
        marginBottom: '2px',
      },
      table: {
        minWidth: 750,
      },
      tableWrapper: {
        overflowX: 'auto',
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    };
    return (
      <Fragment>
        <div className="col-xs-12 text-center p-0">
          <p>{this.state.options.tableBlockName}</p>
        </div>
        <div
          className="col-xs-8 p-0"
          style={
            this.state.options.isFilter
              ? Object.assign({ display: 'block' }, {})
              : Object.assign({ display: 'none' }, {})
          }
        >
          <div className="flt">{this.state.options.filterLabel}</div>
          <div className="flt sliWidth">
            <input type="text" onChange={this.onSearchTextChange} />
          </div>
        </div>

        <div className="col-xs-12 p-0 table-top-mrg">
          <Table className="table table-bordered" id={this.state.options.name}>
            <TableHead>
              <TableRow>
                {this.state.options.columns.map((row, index) => (
                  <KCTableHeaderCell
                    classes={classes}
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    onRequestSort={this.handleRequestSort}
                    propertyName={row}
                    key={'uhead-' + index}
                    columnIndex={index}
                    columnData={row['displayName']}
                    styleObject={row['style']}
                    onColumnClick={this.onColumnSelected}
                  />
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {stableSort(
                this.state.options.rows,
                getSorting(this.state.order, this.state.orderBy),
              ).map((row, index) => (
                <TableRow key={`urow-${index}`}>
                  {this.state.options.displayColumnObjects.map(
                    (columnName, colIndex) => (
                      <KCTableCell
                        key={`ucol-${colIndex}`}
                        columnIndex={colIndex}
                        rowIndex={index}
                        columnData={row[columnName]}
                        styleObject={row['style']}
                        rowObject={row}
                        cellData={row[columnName]}
                        cellProperty={columnName}
                        tableName={this.state.options.name}
                        onRowClick={this.onRowSelected}
                        onCellClick={this.onCellSelected}
                      />
                    ),
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Fragment>
    );
  }
}

KCTable.propTypes = {
  name: propTypes.string.isRequired,
  tableBlockName: propTypes.string.isRequired,
  conditionObject: propTypes.object,
  columns: propTypes.array.isRequired,
  rows: propTypes.array.isRequired,
  isSort: propTypes.bool,
  onTableDataSelect: propTypes.func.isRequired,
  filterLabel: propTypes.string,
  filterColumnName: propTypes.string,
  displayColumnObjects: propTypes.array.isRequired,
  rowLevelColor: propTypes.bool,
  cellLevelColor: propTypes.bool,
  isFilter: propTypes.bool,
};

export default KCTable;
