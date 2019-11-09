import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../../../../../assets/styles/index.scss';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

let selectedRecords = [];
let selectedData = [];

function createData(name, calories, fat, carbs, protein, color) {
  return { name, calories, fat, carbs, protein, color };
}

const rows = [
  createData('2000', 159, 6.0, 24, 4.0, 'red'),
  createData('2017', 237, 9.0, 37, 4.3, 'green'),
  createData('2018', 262, 16.0, 24, 6.0, 'blue'),
  createData('2019', 305, 3.7, 67, 4.3, 'yellow'),
  createData('2021', 356, 16.0, 49, 3.9, 'pink'),
];

const cWidth = {
  width: '10%',
};

const ccWidth = {
  width: '5%',
  fontWeight: '600',
  cursor: 'pointer',
};

const cellCStyle = {
  border: '1px solid black',
  fontWeight: '600',
  cursor: 'pointer',
};

function clearAppliedClasses(ele) {
  if (selectedRecords.length > 0) {
    selectedRecords.map(row => {
      const existingClasses = row.getAttribute('class').split(' ');
      const eleIndex = existingClasses.findIndex(k => k == 'conSelected');
      existingClasses.splice(eleIndex, 1);
      row.setAttribute('class', existingClasses.join(' '));
    });
  }
}

function applySelectClass(ele) {
  let existingClasses = ele.getAttribute('class');
  existingClasses = `${existingClasses} conSelected`;
  ele.setAttribute('class', existingClasses.toString());
}

function applyClasses(records) {
  if (records.length > 0) {
    records.forEach(row => {
      selectedRecords.push(row);
      applySelectClass(row);
    });
  }
}

function applyRowOrColumnFunctionality(ele, type) {
  clearAppliedClasses();
  const name = ele.target.getAttribute('highlight');
  let recordsToBeHighLight = [];

  if (type == 'row')
    recordsToBeHighLight = document.querySelectorAll(
      `td[custom-row='${name}']`,
    );
  else
    recordsToBeHighLight = document.querySelectorAll(
      `td[custom-col='${name}']`,
    );

  applyClasses(recordsToBeHighLight);
}

function showHeatMapForRow(ele) {
  applyRowOrColumnFunctionality(ele, 'row');
}

function showHeatMapForCol(ele) {
  applyRowOrColumnFunctionality(ele, 'col');
}

function showHeatMap(ele) {
  clearAppliedClasses();
  selectedRecords.push(ele.target);
  applySelectClass(ele.target);
}

function tableToExcel() {
  var uri = 'data:application/vnd.ms-excel;base64,',
    template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      });
    };
  return function(table, name) {
    debugger;
    table = 'customTable';
    name = 'test';
    if (!table.nodeType) table = document.getElementById(table);
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
    window.location.href = uri + base64(format(template, ctx));
  };
}

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <button
        onClick={tableToExcel('customTable', 'test')}
        style={Object.assign({ float: 'right' })}
      >
        Export To Excel
      </button>
      <Table className={classes.table} id="customTable">
        <TableHead>
          <TableRow>
            <TableCell style={cWidth}>Total</TableCell>
            <TableCell
              align="right"
              style={ccWidth}
              highlight="cus-col-2"
              onClick={ele => showHeatMapForCol(ele)}
            >
              Mar19
            </TableCell>
            <TableCell
              align="right"
              style={ccWidth}
              highlight="cus-col-3"
              onClick={ele => showHeatMapForCol(ele)}
            >
              Mar26
            </TableCell>
            <TableCell
              align="right"
              style={ccWidth}
              highlight="cus-col-4"
              onClick={ele => showHeatMapForCol(ele)}
            >
              Apr2
            </TableCell>
            <TableCell
              align="right"
              style={ccWidth}
              highlight="cus-col-5"
              onClick={ele => showHeatMapForCol(ele)}
            >
              Apr16
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell
                component="th"
                scope="row"
                highlight={`row${index}`}
                style={Object.assign({ cursor: 'pointer' }, cWidth)}
                onClick={ele => showHeatMapForRow(ele)}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="right"
                custom-cell={`cell-2-${index}`}
                custom-row={`row${index}`}
                custom-col="cus-col-2"
                style={Object.assign(
                  { cursor: 'pointer', textAlign: 'center' },
                  ccWidth,
                  cellCStyle,
                  { backgroundColor: row.color },
                )}
                onClick={ele => showHeatMap(ele)}
              >
                {row.calories}
              </TableCell>
              <TableCell
                align="right"
                custom-cell={`cell-3-${index}`}
                custom-row={`row${index}`}
                custom-col="cus-col-3"
                style={Object.assign(
                  { cursor: 'pointer', textAlign: 'center' },
                  ccWidth,
                  cellCStyle,
                  { backgroundColor: row.color },
                )}
                onClick={ele => showHeatMap(ele)}
              >
                {row.fat}
              </TableCell>
              <TableCell
                align="right"
                custom-cell={`cell-4-${index}`}
                custom-row={`row${index}`}
                custom-col="cus-col-4"
                style={Object.assign(
                  { cursor: 'pointer', textAlign: 'center' },
                  ccWidth,
                  cellCStyle,
                  { backgroundColor: row.color },
                )}
                onClick={ele => showHeatMap(ele)}
              >
                {row.carbs}
              </TableCell>
              <TableCell
                align="right"
                custom-cell={`cell-5-${index}`}
                custom-row={`row${index}`}
                custom-col="cus-col-5"
                style={Object.assign(
                  { cursor: 'pointer', textAlign: 'center' },
                  ccWidth,
                  cellCStyle,
                  { backgroundColor: row.color },
                )}
                onClick={ele => showHeatMap(ele)}
              >
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
