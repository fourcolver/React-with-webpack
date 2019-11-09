import { TestScheduler } from 'rxjs/testing';
import { BusinessGroupConst } from '../business-group.actionTypes';
import { businessGroup } from '../business-group.epic';

describe('business-group.epic', () => {
  it('should BusinessGroup send POST request with header and post-data in body', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      const data = [
        {
          frame: 3,
          notification: {
            error: undefined,
            hasValue: true,
            kind: 'N',
            value: {
              payload: 'RxJs_Response_data',
              type: 'BUSINESS_GROUP_SUCCESS',
            },
          },
        },
      ];
      expect(data).toEqual(expected);
    });
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: {
          type: BusinessGroupConst.BUSINESS_GROUP_REQUEST,
          payload: 'Pay_load',
        },
      });
      const rxAjax = config =>
        cold('--a', {
          a: { data: 'RxJs_Response_data' },
        });
      const output$ = businessGroup(action$);

      expectObservable(output$).toBe('---a', {
        a: {
          type: BusinessGroupConst.BUSINESS_GROUP_SUCCESS,
          payload: 'RxJs_Response_data',
        },
      });
    });
  });
});
