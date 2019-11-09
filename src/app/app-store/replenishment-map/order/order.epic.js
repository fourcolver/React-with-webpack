import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderConst } from './order.actionTypes';
import { orderSuccess, orderFailure } from './order.actions';

import { rxAjax } from '../../../utils';
import config from '../../../config';

export const order = action$ =>
  action$.pipe(
    ofType(OrderConst.FLOW_MAP_REQUEST),
    mergeMap(action => {
      return rxAjax({
        endpoint: `${config.apiGateway.BASE_URL}/api/replenishment/order`,
        method: 'POST',
        payload: action.payload,
        headers: {
          client_id: action.payload.client_id,
          client_secret: action.payload.client_secret,
        },
      }).pipe(
        map(data => orderSuccess(data)),
        catchError(error => {
          orderFailure(error);
          return of(error);
        }),
      );
    }),
  );
