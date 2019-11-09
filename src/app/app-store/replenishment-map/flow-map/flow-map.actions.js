import { FlowMapConst } from './flow-map.actionTypes';

export const flowMapRequest = postData => dispatch => {
  dispatch({
    type: FlowMapConst.FLOW_MAP_REQUEST,
    payload: postData,
  });
};

export const flowMapSuccess = data => {
  return {
    type: FlowMapConst.FLOW_MAP_SUCCESS,
    payload: data,
  };
};

export const flowMapFailure = data => {
  return {
    type: FlowMapConst.FLOW_MAP_FAILURE,
    payload: data,
  };
};
