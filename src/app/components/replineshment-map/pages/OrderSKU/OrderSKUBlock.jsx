import React from 'react';

import axios from 'axios';
import KCTable from '../Table/KCTable';

let OTIFSKUBlockData = [];

const columnsInfo = [
  { displayName: 'Order SKU #', id: 'ORDER_SKU', numeric: false, style: {} },
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

class OrderSKUBlock extends React.Component {
  constructor(props) {
    super();

    this.state = {
      options: props,
      selectedData: [],
      typeOfSelection: '',
      metaData: {
        columns: columnsInfo,
        originalCollection: OTIFSKUBlockData,
        rows: this.setStylingForOTIFCells(
          OTIFSKUBlockData,
          props.conditionObject.selectedThresoldValue,
        ),
        filterColumnName: 'ORDER_SKU',
        displayColumnObjects: [
          'ORDER_SKU',
          'TARGET_QTY',
          'DELIVERED_QTY',
          'NET_DIFF',
          'OTIFPer',
        ],
      },
    };

    this.onTableDataSelect = this.onTableDataSelect.bind(this);
  }

  componentDidUpdate() {
    console.log(this.props.conditionObject.businessGroupList);
    console.log(this.props.lineHandlersc);
    // if(this.props.lineHandlersc === ''){
    //     // alert("yes line");
    // }

    if (!(this.props.lineHandlersc === '')) {
      // alert("no line");
      const serviceURL =
        'http://ustcl158.kcc.com:16005/api/replenishment/order/destPlant';
      const headers = {
        'Content-Type': 'application/json',
        client_id: '254efb29df334f13bb88df09e4f9d587',
        client_secret: '5e7900f6C2904f9883b38DD29400380E',
      };

      let data = {
        startDate: '2019-07-22',
        endDate: '2019-11-03',
        unitOfMeasure: 'Global Standard Units',
        businessGroup: this.props.conditionObject.businessGroupList,
        destPlant: this.props.lineHandlersc,
      };

      axios
        .post(serviceURL, data, {
          headers,
        })
        .then(response => {
          OTIFSKUBlockData = response.data;

          const rows = this.setStylingForOTIFCells(
            OTIFSKUBlockData,
            this.state.options.conditionObject.selectedThresoldValue,
            this.state.options.conditionObject.zone,
          );

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
              rows: rows,
            },
          });
        })
        .catch(error => {});
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps != this.props) {
      this.setState({ options: nextProps });
      if (nextProps.conditionObject != this.props.conditionObject) {
        this.setState({
          ...this.state.metaData,
          rows: this.setStylingForOTIFCells(
            OTIFSKUBlockData,
            nextProps.conditionObject.selectedThresoldValue,
            nextProps.conditionObject.zone,
          ),
        });

        if (
          nextProps.conditionObject.orderSKUData != '' &&
          nextProps.conditionObject.orderSKUData != undefined &&
          nextProps.conditionObject.orderSKUData !=
            this.props.conditionObject.orderSKUData
        ) {
          // const serviceURL="http://ustcl158.kcc.com:16005/api/replenishment/order?businessGroup="+nextProps.conditionObject.orderSKUData;

          const serviceURL =
            'http://ustcl158.kcc.com:16005/api/replenishment/order';

          const headers = {
            'Content-Type': 'application/json',
            client_id: '254efb29df334f13bb88df09e4f9d587',
            client_secret: '5e7900f6C2904f9883b38DD29400380E',
          };

          let data = {
            startDate: '2019-07-22',
            endDate: '2019-11-03',
            unitOfMeasure: 'Global Standard Units',
            businessGroup: nextProps.conditionObject.orderSKUData,
            destPlant: '2320',
          };

          axios
            .post(serviceURL, data, {
              headers,
            })
            .then(response => {
              //   dispatch({
              //     type: FOUND_USER,
              //     data: response.data[0]
              //   })
              OTIFSKUBlockData = response.data;

              const rows = this.setStylingForOTIFCells(
                OTIFSKUBlockData,
                this.state.options.conditionObject.selectedThresoldValue,
                this.state.options.conditionObject.zone,
              );

              //you can use this or below
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
              //     type: ERROR_FINDING_USER
              //   })
            });
        }
      }
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  setStylingForOTIFCells(rows, conditionValue, zone) {
    let styleObject = {};
    rows.forEach(row => {
      //var otifPercentage = (parseFloat(row["DELIVERED_QTY"]) / parseFloat(row["TARGET_QTY"])) * 100;
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

      // row["ACTUAL_DELIVERED_QTY_GSU"] =this.numberWithCommas(row["ACTUAL_DELIVERED_QTY_GSU"]);

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
    //return rows;
  }

  onTableDataSelect(selTableObject) {
    this.setState({
      selectedData: selTableObject.data,
      typeOfSelection: selTableObject.type,
    });

    //  alert("In Table data select  " + selTableObject.type);
  }

  render() {
    KCTable.defaultProps = {
      name: 'OTIFSKUBlock',
      tableBlockName: 'Order SKU Delivery',
      conditionObject: this.state.options.conditionObject,
      columns: this.state.metaData.columns,
      rows: this.state.metaData.rows,
      isSort: false,
      onTableDataSelect: this.onTableDataSelect,
      filterLabel: 'ORDER SKU',
      filterColumnName: this.state.metaData.filterColumnName,
      displayColumnObjects: this.state.metaData.displayColumnObjects,
      rowLevelColor: true,
      cellLevelColor: false,
      isFilter: false,
      order: 'asc',
      orderBy: 'ORDER_SKU',
    };

    return (
      <div>
        <KCTable />
      </div>
    );
  }
}

export default OrderSKUBlock;
