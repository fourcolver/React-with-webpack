import { combineEpics } from 'redux-observable';

import { businessGroup } from './replenishment-map/business-group';
import { destPlant } from './replenishment-map/dest-plant';
import { flowMap } from './replenishment-map/flow-map';
import { order } from './replenishment-map/order';

export default combineEpics(businessGroup, destPlant, flowMap, order);
