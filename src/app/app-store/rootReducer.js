import { combineReducers } from 'redux';

import { businessGroupReducer } from './replenishment-map/business-group';
import { destPlantReducer } from './replenishment-map/dest-plant';
import { flowMapReducer } from './replenishment-map/flow-map';
import { orderReducer } from './replenishment-map/order';

export default combineReducers({
  businessGroup: businessGroupReducer,
  destPlant: destPlantReducer,
  flowMap: flowMapReducer,
  order: orderReducer,
});
