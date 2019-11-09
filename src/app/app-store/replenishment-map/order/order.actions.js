import { OrderConst } from './order.actionTypes';

export const orderRequest = postData => dispatch => {
  dispatch({
    type: OrderConst.ORDER_REQUEST,
    payload: postData,
  });
};

export const orderSuccess = data => {
  return {
    type: OrderConst.ORDER_SUCCESS,
    payload: data,
  };
};

export const orderFailure = data => {
  return {
    type: OrderConst.ORDER_FAILURE,
    payload: data,
  };
};
