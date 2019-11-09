import { DestPlantConst } from './dest-plant.actionTypes';

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

export const destPlantReducer = (state = initialState, action) => {
  switch (action.type) {
    case DestPlantConst.DEST_PLANT_REQUEST: {
      return {
        ...state,
        filters: {
          ...action.payload.filters,
        },
        loading: true,
      };
    }
    case DestPlantConst.DEST_PLANT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case DestPlantConst.DEST_PLANT_FAILURE: {
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
