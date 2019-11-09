import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import CustomKCSlider from '../Slider/KCSlider';
import OTIFBusinessGroup from './OTIFBusinessGroup';

import OrderSKUBlock from '../OrderSKU/OrderSKUBlock';

import KCBubbleChart from '../BubbleChart/KCBubbleChart';

// import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../../../assets/styles/index.scss';

class OTIFBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props,
      OTIFParams: {
        selectedThresoldValue: props.selectedThresoldValue,
        zone: 'All',
        businessGroupList: '',
        orderSKUData: '',
      },
      shown: false,
      businessGroupList: '',
      orderSKUData: '',
      shipping: [],
      lineSelect: '',
    };

    this.onThresoldValueChange = this.onThresoldValueChange.bind(this);
    this.onOTIFBusinessGroupSlect = this.onOTIFBusinessGroupSlect.bind(this);
    this.onOTIFZoneChange = this.onOTIFZoneChange.bind(this);
    this.onOrderSKUSlect = this.onOrderSKUSlect.bind(this);
    // this.businessSelect = this.businessSelect.bind(this);
  }

  componentDidMount() {}

  businessSelect = businessName => {
    console.log(businessName);

    const serviceURL =
      'http://ustcl158.kcc.com:16005/api/replenishment/flowMap';
    const headers = {
      'Content-Type': 'application/json',
      client_id: '254efb29df334f13bb88df09e4f9d587',
      client_secret: '5e7900f6C2904f9883b38DD29400380E',
    };
    const data = {
      startDate: '2019-07-22',
      endDate: '2019-11-03',
      unitOfMeasure: 'Global Standard Units',
      businessGroup: businessName,
      destPlant: '2299',
    };

    axios
      .post(serviceURL, data, {
        headers,
      })
      .then(response => {
        this.setState({
          shipping: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  lineFunc = plant => {
    this.setState({
      lineSelect: plant,
    });
  };
  iconFunc(PLANT) {
    console.log(`${PLANT}`);
  }

  onThresoldValueChange(value) {
    this.setState({
      OTIFParams: {
        selectedThresoldValue: value,
        zone: this.state.OTIFParams.zone,
      },
    });
  }

  onOTIFZoneChange(event) {
    this.setState({
      OTIFParams: {
        zone: event.target.value,
        selectedThresoldValue: this.state.OTIFParams.selectedThresoldValue,
      },
    });
  }

  onOTIFBusinessGroupSlect(selTableObject) {
    let busniessGroupName = '';
    if (selTableObject.type == 'cell')
      busniessGroupName =
        selTableObject.data.currentTarget.parentNode.firstElementChild
          .textContent;
    else busniessGroupName = selTableObject.data.currentTarget.textContent;

    this.setState({
      OTIFParams: {
        ...this.state.OTIFParams,
        businessGroupList: busniessGroupName,
        orderSKUData: busniessGroupName,
      },
      shown: true,
      lineSelect: '',
    });

    this.businessSelect(busniessGroupName);
  }

  onOrderSKUSlect(selectedData) {
    this.setState({
      OTIFParams: {
        ...this.state.OTIFParams,
        // orderSKUData:selectedData
      },
    });
  }

  render() {
    CustomKCSlider.defaultProps = {
      thresoldValue: parseInt(this.state.OTIFParams.selectedThresoldValue),
      sliderLabel: 'Red Zone Threshold',
      numberFormat: '%',
      min: 0,
      max: 100,
      onThresoldValueChange: this.onThresoldValueChange,
    };

    // alert(this.state.OTIFParams.businessGroupList)

    return (
      // <React.Fragment>
      //  <div className="col-md-12 p-0">

      // <div className="col-md-4 p-0">
      //     <CustomKCSlider />

      //     <div className="col-xs-12 p-0 border-gray">
      //       <h5 className="text-center">OTIF Color Code</h5>
      //       <div className="col-xs-12 new">
      //       <input type="radio" name="otifzone" value="All" checked={this.state.OTIFParams.zone === 'All'}
      //                 onChange={this.onOTIFZoneChange}/><label>All</label>

      //                 <input  type="radio" name="otifzone" value="above" checked={this.state.OTIFParams.zone === 'above'}
      //                 onChange={this.onOTIFZoneChange}/><label>Above Red Zone</label>

      //                 <input type="radio" name="otifzone" value="below" checked={this.state.OTIFParams.zone === 'below'}
      //                 onChange={this.onOTIFZoneChange}/><label>Below Red Zone</label>
      //       </div>
      //    </div>

      //    <div className="col-xs-12 p-0 kct-tbl border-gray">
      //       <OTIFBusinessGroup conditionObject={this.state.OTIFParams} onTableDataSelect={this.onOTIFBusinessGroupSlect} />
      //    </div>

      // </div>

      //  <div className="col-md-8" style={(this.state.shown)?Object.assign({ display: "block" },{}):Object.assign({ display: "none" },{})}>
      //    <div class="col-xs-12 p-0 bg-white border-gray">
      //         <KCBubbleChart conditionObject={this.state.OTIFParams} onLineSelect={this.onOrderSKUSlect} />
      //    </div>
      //    <div className="col-xs-12 p-0 table-top-mrg border-gray" style={(this.state.shown)?Object.assign({ display: "block" },{}):Object.assign({ display: "none" },{})}>
      //    <OrderSKUBlock conditionObject={this.state.OTIFParams}/>
      //    </div>
      // </div>

      // </div>

      // </React.Fragment>

      <React.Fragment>
        <div className="col-md-12 p-0">
          <div className="col-md-4 p-0 padd-right-8">
            <CustomKCSlider />

            <div className="col-xs-12 p-0 border-gray">
              <h5 className="text-center">OTIF Color Code</h5>
              <div className="col-xs-12 new">
                <input
                  type="radio"
                  name="otifzone"
                  value="All"
                  checked={this.state.OTIFParams.zone === 'All'}
                  onChange={this.onOTIFZoneChange}
                />
                <label>All</label>

                <input
                  type="radio"
                  name="otifzone"
                  value="above"
                  checked={this.state.OTIFParams.zone === 'above'}
                  onChange={this.onOTIFZoneChange}
                />
                <label>Above Red Zone</label>

                <input
                  type="radio"
                  name="otifzone"
                  value="below"
                  checked={this.state.OTIFParams.zone === 'below'}
                  onChange={this.onOTIFZoneChange}
                />
                <label>Below Red Zone</label>
              </div>
            </div>

            <div className="col-xs-12 p-0 kct-tbl">
              <OTIFBusinessGroup
                conditionObject={this.state.OTIFParams}
                onTableDataSelect={this.onOTIFBusinessGroupSlect}
              />
            </div>
          </div>

          <div
            className="col-md-8 p-0 padd-left-8"
            style={
              this.state.shown
                ? Object.assign({ opacity: '1' }, {})
                : Object.assign({ opacity: '0' }, {})
            }
          >
            <div className="col-xs-12 p-0 bg-white border-gray">
              {/* <KCBubbleChart conditionObject={this.state.OTIFParams} onLineSelect={this.onOrderSKUSlect} /> */}

              <KCBubbleChart
                mapData={this.state.shipping}
                lineHandler={this.lineFunc}
                iconHandler={this.iconFunc}
                businessGroupListSelected={
                  this.state.OTIFParams.businessGroupList
                }
                ThresoldValue={this.props.selectedThresoldValue}
              />
            </div>
            <div className="col-xs-12 p-0 table-top-mrg border-gray">
              <OrderSKUBlock
                conditionObject={this.state.OTIFParams}
                lineHandlersc={this.state.lineSelect}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OTIFBlock;
