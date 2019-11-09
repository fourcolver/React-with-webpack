import React, { Fragment } from 'react';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import propTypes from 'prop-types';

import {
  DEFAULT_STEP_COUNT,
  DEFAULT_MIN_VALUE,
  DEFAULT_MAX_VALUE,
} from '../constants';

class CustomKCSlider extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: props,
      sliderValue:
        props.thresoldValue +
        (props.numberFormat != undefined ? props.numberFormat : ''),
    };

    this.onDragStopHandle = this.onDragStopHandle.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps != this.props) {
      //you can use this or below

      this.setState({
        options: {
          ...this.state.options,
          thresoldValue: parseInt(nextProps.thresoldValue),
        },
        sliderValue:
          nextProps.thresoldValue != '' && !isNaN(nextProps.thresoldValue)
            ? nextProps.thresoldValue +
              (nextProps.numberFormat != undefined
                ? nextProps.numberFormat
                : '')
            : '',
      });
    }
  }
  onDragStopHandle() {
    alert('on drag stop');
  }

  onTextChangeHandle = function(event) {
    console.log(event.target.value);
    const numberFormat =
      this.state.options.numberFormat != undefined
        ? this.state.options.numberFormat
        : '';
    const value = event.target.value != '' ? event.target.value : '';
    this.setState({
      options: {
        ...this.state.options,
        thresoldValue: parseInt(value),
      },
      sliderValue: value,
    });

    this.state.options.onThresoldValueChange(parseInt(value));

    // this.setState(prevState => {

    //     let modifyState = Object.assign({}, prevState);
    //     debugger;
    //     modifyState.options.thresoldValue = value;
    //     modifyState.sliderValue=value + (this.state.options.numberFormat != undefined ? this.state.options.numberFormat : '');

    //     debugger;
    //     return { modifyState };
    //   })
  };

  onStepCountIncrease = function() {
    let sValue = parseInt(this.state.sliderValue);

    const maxValue = this.state.options.max;

    if (sValue + 1 <= maxValue) sValue = parseInt(sValue) + 1;

    this.setState({
      options: {
        ...this.state.options,
        thresoldValue: parseInt(sValue),
      },
      sliderValue:
        sValue +
        (this.state.options.numberFormat != undefined
          ? this.state.options.numberFormat
          : ''),
    });
    this.state.options.onThresoldValueChange(parseInt(sValue));
  };

  onStepCountDecrease = function() {
    let sValue = parseInt(this.state.sliderValue);
    const minValue = this.state.options.min;

    if (sValue - 1 >= minValue) sValue = parseInt(sValue) - 1;

    this.setState({
      options: {
        ...this.state.options,
        thresoldValue: parseInt(sValue),
      },
      sliderValue:
        sValue +
        (this.state.options.numberFormat != undefined
          ? this.state.options.numberFormat
          : ''),
    });

    this.state.options.onThresoldValueChange(parseInt(sValue));
  };

  render() {
    const defaultStepCount = DEFAULT_STEP_COUNT;
    const defaultMinValue = DEFAULT_MIN_VALUE;
    const defaultMaxValue = DEFAULT_MAX_VALUE;

    const showValuetext = function(value) {
      return (
        value +
        (this.state.options.numberFormat != undefined
          ? this.state.options.numberFormat
          : '')
      );
    };

    const getStepCount = function(stepCount) {
      if (stepCount != undefined) return stepCount;
      else return defaultStepCount;
    };

    const getToolTipDisplay = function(toolTipDisplay) {
      if (toolTipDisplay != undefined) {
        if (toolTipDisplay) return 'on';
        else return 'off';
      } else return 'on';
    };

    const getMinValue = function(minValue) {
      if (minValue != undefined) return minValue;
      else return defaultMinValue;
    };

    const getMaxValue = function(maxValue) {
      if (maxValue != undefined) return maxValue;
      else return defaultMaxValue;
    };

    const onChangeHandle = function(event, value) {
      this.setState({
        options: {
          ...this.state.options,
          thresoldValue: value,
        },
        sliderValue:
          value +
          (this.state.options.numberFormat != undefined
            ? this.state.options.numberFormat
            : ''),
      });

      this.state.options.onThresoldValueChange(value);

      // this.setState(prevState => {

      //     let modifyState = Object.assign({}, prevState);
      //     debugger;
      //     modifyState.options.thresoldValue = value;
      //     modifyState.sliderValue=value + (this.state.options.numberFormat != undefined ? this.state.options.numberFormat : '');

      //     debugger;
      //     return { modifyState };
      //   })
    };

    return (
      <Fragment>
        <div className="col-xs-12 p-0 border-gray">
          <h5 className="text-center">{this.state.options.sliderLabel}</h5>
          <div className="col-md-2">
            <input
              className="sliWidth"
              type="text"
              value={this.state.sliderValue}
              onChange={e => this.onTextChangeHandle(e)}
            />
          </div>
          <div className="col-md-7 col-md-offset-1">
            <Slider
              value={this.state.options.thresoldValue}
              getAriaValueText={showValuetext.bind(this)}
              aria-labelledby="input-slider"
              step={getStepCount(this.state.options.stepCount)}
              min={getMinValue(this.state.options.min)}
              max={getMaxValue(this.state.options.max)}
              onChangeCommitted={onChangeHandle.bind(this)}
              marks
            />
          </div>
          <div className="col-md-2">
            <span
              className="glyphicon glyphicon-menu-left"
              onClick={this.onStepCountDecrease.bind(this)}
            ></span>
            <span
              className="glyphicon glyphicon-menu-right"
              onClick={this.onStepCountIncrease.bind(this)}
            ></span>
          </div>
        </div>
      </Fragment>
    );
  }
}

CustomKCSlider.propTypes = {
  thresoldValue: propTypes.number.isRequired,
  sliderLabel: propTypes.string.isRequired,
  stepCount: propTypes.number,
  toolTipDisplay: propTypes.bool,
  min: propTypes.number,
  max: propTypes.number,
  numberFormat: propTypes.string,
  onThresoldValueChange: propTypes.func.isRequired,
};

export default CustomKCSlider;
