import { OrderConst } from './order.actionTypes';

export const initialState = {
  loading: false,
  filters: {
    clientId: null,
    clientSecret: null,
    startDate: null,
    endDate: null,
    unitOfMeasure: null,
    businessGroup: null,
    destPlant: null,
  },
  data: [],
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case OrderConst.ORDER_REQUEST: {
      return {
        ...state,
        filters: {
          ...action.payload.filters,
        },
        loading: true,
      };
    }
    case OrderConst.ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case OrderConst.ORDER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
