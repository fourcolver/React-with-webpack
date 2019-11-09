import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import KCTable from '../Table/KCTable';

// let OTIFBusinessGroupData=[{"BUSINESS_GROUP":"Branded Perineal Hygiene","TARGET_QTY_GSU":944436.00000,"ACTUAL_DELIVERED_QTY_GSU":771644.00000,"net_diff":-172792.00000},{"BUSINESS_GROUP":"Wipers","TARGET_QTY_GSU":95025.00000,"ACTUAL_DELIVERED_QTY_GSU":70381.00000,"net_diff":-24644.00000},{"BUSINESS_GROUP":"Branded Household Health & Hygiene","TARGET_QTY_GSU":52558.00000,"ACTUAL_DELIVERED_QTY_GSU":45306.00000,"net_diff":-7252.00000},{"BUSINESS_GROUP":"Hand Hygiene & Tissue","TARGET_QTY_GSU":1007276.00000,"ACTUAL_DELIVERED_QTY_GSU":721141.00000,"net_diff":-286135.00000},{"BUSINESS_GROUP":"Branded Infant Care","TARGET_QTY_GSU":206907.00000,"ACTUAL_DELIVERED_QTY_GSU":158519.00000,"net_diff":-48388.00000},{"BUSINESS_GROUP":"Branded Hands Face & Body","TARGET_QTY_GSU":133863.00000,"ACTUAL_DELIVERED_QTY_GSU":101521.00000,"net_diff":-32342.00000},{"BUSINESS_GROUP":"Corp Brand Hands Face & Body","TARGET_QTY_GSU":95025.00000,"ACTUAL_DELIVERED_QTY_GSU":70381.00000,"net_diff":-24644.00000},{"BUSINESS_GROUP":"Branded Child Care","TARGET_QTY_GSU":1504.00000,"ACTUAL_DELIVERED_QTY_GSU":1349.00000,"net_diff":-155.00000},{"BUSINESS_GROUP":"Corporate Brand Perineal Hygiene","TARGET_QTY_GSU":189885.00000,"ACTUAL_DELIVERED_QTY_GSU":144864.00000,"net_diff":-45020.00000},{"BUSINESS_GROUP":"Branded BCC Wipes","TARGET_QTY_GSU":23009.00000,"ACTUAL_DELIVERED_QTY_GSU":15896.00000,"net_diff":-7113.00000},{"BUSINESS_GROUP":null,"TARGET_QTY_GSU":849891.00000,"ACTUAL_DELIVERED_QTY_GSU":517172.00000,"net_diff":-332719.00000},{"BUSINESS_GROUP":"Corporate New Business","TARGET_QTY_GSU":67706.00000,"ACTUAL_DELIVERED_QTY_GSU":67394.00000,"net_diff":-313.00000},{"BUSINESS_GROUP":"Branded Menstrual","TARGET_QTY_GSU":397656.00000,"ACTUAL_DELIVERED_QTY_GSU":268243.00000,"net_diff":-129413.00000},{"BUSINESS_GROUP":"Corporate Brand Feminine Incontinence","TARGET_QTY_GSU":32.00000,"ACTUAL_DELIVERED_QTY_GSU":32.00000,"net_diff":-1.00000},{"BUSINESS_GROUP":"Branded Senior Care Incontinence","TARGET_QTY_GSU":10433.00000,"ACTUAL_DELIVERED_QTY_GSU":8041.00000,"net_diff":-2393.00000},{"BUSINESS_GROUP":"Branded Feminine Light Bladder Leakage","TARGET_QTY_GSU":46559.00000,"ACTUAL_DELIVERED_QTY_GSU":20546.00000,"net_diff":-26013.00000},{"BUSINESS_GROUP":"Industrial PPE","TARGET_QTY_GSU":33090.00000,"ACTUAL_DELIVERED_QTY_GSU":31297.00000,"net_diff":-1793.00000},{"BUSINESS_GROUP":"Branded BCC Bath Body & Accessories","TARGET_QTY_GSU":29028.00000,"ACTUAL_DELIVERED_QTY_GSU":15779.00000,"net_diff":-13249.00000},{"BUSINESS_GROUP":"S&IP Infection Control Products","TARGET_QTY_GSU":600.00000,"ACTUAL_DELIVERED_QTY_GSU":600.00000,"net_diff":0.00000},{"BUSINESS_GROUP":"Scientific PPE","TARGET_QTY_GSU":2982.00000,"ACTUAL_DELIVERED_QTY_GSU":2892.00000,"net_diff":-90.00000},{"BUSINESS_GROUP":"Other KCP","TARGET_QTY_GSU":2611.00000,"ACTUAL_DELIVERED_QTY_GSU":2610.00000,"net_diff":-1.00000},{"BUSINESS_GROUP":"Corporate Brand Infant Care","TARGET_QTY_GSU":2000.00000,"ACTUAL_DELIVERED_QTY_GSU":1994.00000,"net_diff":-6.00000},{"BUSINESS_GROUP":"Partnership Rolled Products","TARGET_QTY_GSU":450.00000,"ACTUAL_DELIVERED_QTY_GSU":447.00000,"net_diff":-3.00000},{"BUSINESS_GROUP":"Other Family Care","TARGET_QTY_GSU":1937.00000,"ACTUAL_DELIVERED_QTY_GSU":1918.00000,"net_diff":-19.00000},{"BUSINESS_GROUP":"Other Personal Care","TARGET_QTY_GSU":11234.00000,"ACTUAL_DELIVERED_QTY_GSU":11142.00000,"net_diff":-92.00000},{"BUSINESS_GROUP":"Corp Brand Household Health & Hygiene","TARGET_QTY_GSU":361.00000,"ACTUAL_DELIVERED_QTY_GSU":337.00000,"net_diff":-24.00000}];

let OTIFBusinessGroupData = [];
const columnsInfo = [
  {
    displayName: 'PH03 - Busniess Group',
    id: 'BUSINESS_GROUP',
    numeric: false,
    style: {},
  },
  { displayName: 'Target Qty', id: 'TARGET_QTY', numeric: true, style: {} },
  {
    displayName: 'Delivered Qty',
    id: 'DELIVERED_QTY',
    numeric: true,
    style: {},
  },
  { displayName: 'Net Diff', id: 'NET_DIFF', numeric: true, style: {} },
  { displayName: 'OTIF %', id: 'OTIFPer', numeric: true, style: {} },
];

class OTIFBusinessGroup extends React.Component {
  constructor(props) {
    super();

    this.state = {
      options: props,
      selectedData: [],
      typeOfSelection: '',
      metaData: {
        columns: columnsInfo,
        originalCollection: OTIFBusinessGroupData,
        rows: this.setStylingForOTIFCells(
          OTIFBusinessGroupData,
          props.conditionObject.selectedThresoldValue,
          props.conditionObject.zone,
        ),
        filterColumnName: 'BUSINESS_GROUP',
        displayColumnObjects: [
          'BUSINESS_GROUP',
          'TARGET_QTY',
          'DELIVERED_QTY',
          'NET_DIFF',
          'OTIFPer',
        ],
      },
    };

    this.onTableDataSelect = this.onTableDataSelect.bind(this);
  }

  componentDidMount() {
    const serviceURL =
      'http://ustcl158.kcc.com:16005/api/replenishment/businessGroup';
    const headers = {
      'Content-Type': 'application/json',
      client_id: '254efb29df334f13bb88df09e4f9d587',
      client_secret: '5e7900f6C2904f9883b38DD29400380E',
    };

    const data = {
      startDate: '2019-07-22',
      endDate: '2019-11-03',
      unitOfMeasure: 'Global Standard Units',
    };

    axios
      .post(serviceURL, data, {
        headers,
      })
      .then(response => {
        //   dispatch({
        //     type: FOUND_BG,
        //     data: response.data[0]
        //   })
        OTIFBusinessGroupData = response.data;

        const rows = this.setStylingForOTIFCells(
          OTIFBusinessGroupData,
          this.state.options.conditionObject.selectedThresoldValue,
          this.state.options.conditionObject.zone,
        );

        // you can use this or below
        this.setState({
          options: {
            ...this.state.options,
            rowObject: this.state.options.rowObject,
            rowIndex: this.state.options.rowIndex,
            columnData: this.state.options.columnData,
            styleObject: this.state.options.styleObject,
            cellData: this.state.options.cellData,
            cellProperty: this.state.options.cellProperty,
          },
          metaData: {
            ...this.state.metaData,
            rows,
          },
        });
      })
      .catch(error => {
        //   dispatch({
        //     type: ERROR_BG
        //   })
      });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps != this.props) {
      const rows = this.setStylingForOTIFCells(
        OTIFBusinessGroupData,
        nextProps.conditionObject.selectedThresoldValue,
        nextProps.conditionObject.zone,
      );
      //   you can use this or below
      this.setState({
        options: {
          ...this.state.options,
          rowObject: nextProps.rowObject,
          rowIndex: nextProps.rowIndex,
          columnData: nextProps.columnData,
          styleObject: nextProps.styleObject,
          cellData: nextProps.cellData,
          cellProperty: nextProps.cellProperty,
        },
        metaData: {
          ...this.state.metaData,
          rows,
        },
      });
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  setStylingForOTIFCells(rows, conditionValue, zone) {
    let styleObject = {};
    rows.forEach(row => {
      // var otifPercentage = (parseFloat(row["DELIVERED_QTY"]) / parseFloat(row["TARGET_QTY"])) * 100;
      var otifPercentage =
        parseFloat(row['DELIVERED_QTY']) - parseFloat(row['TARGET_QTY']);
      row['OTIFPer'] = parseFloat(otifPercentage).toFixed(1);
      if (parseFloat(row['OTIFPer']) >= parseFloat(conditionValue))
        styleObject = {
          backgroundColor: '#2ca02c',
          color: '#fff',
          textAlign: 'right',
        };
      else
        styleObject = {
          backgroundColor: '#d62728',
          color: '#fff',
          textAlign: 'right',
        };

      // row["DELIVERED_QTY"] =this.numberWithCommas(row["DELIVERED_QTY"]);

      // row["TARGET_QTY_GSU"] =this.numberWithCommas(row["TARGET_QTY_GSU"]);

      // row["OTIFPer"] =this.numberWithCommas(row["OTIFPer"]);
      // row["net_diff"] =this.numberWithCommas(row["net_diff"]);

      row['style'] = styleObject;
    });

    let rowsData = [];
    if (zone == 'above') {
      rows.forEach(row => {
        if (row.style.backgroundColor == '#2ca02c') {
          rowsData.push(row);
        }
      });
    } else if (zone == 'below') {
      rows.forEach(row => {
        if (row.style.backgroundColor == '#d62728') {
          rowsData.push(row);
        }
      });
    } else {
      rowsData = rows;
    }

    return rowsData;
    // return rows;
  }

  onTableDataSelect(selTableObject) {
    // console.log(selTableObject.data.target.getAttribute('highlight').split('row')[1],"====selTableObject")
    this.setState({
      selectedData: selTableObject.data,
      typeOfSelection: selTableObject.type,
    });

    if (selTableObject.type != 'column')
      this.state.options.onTableDataSelect(selTableObject);
    // alert("In Table data select  " + selTableObject.data.target);
  }

  render() {
    KCTable.defaultProps = {
      name: 'OTIFBusinessGroup',
      tableBlockName: 'OTIF By Business Group',
      conditionObject: this.state.options.conditionObject,
      columns: this.state.metaData.columns,
      rows: this.state.metaData.rows,
      isSort: false,
      onTableDataSelect: this.onTableDataSelect,
      filterLabel: 'Business Group',
      filterColumnName: this.state.metaData.filterColumnName,
      displayColumnObjects: this.state.metaData.displayColumnObjects,
      rowLevelColor: true,
      cellLevelColor: false,
      isFilter: false,
      order: 'asc',
      orderBy: 'BUSINESS_GROUP',
    };

    return (
      <Fragment>
        <KCTable />
      </Fragment>
    );
  }
}

export default OTIFBusinessGroup;
