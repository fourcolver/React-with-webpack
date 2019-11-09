import nock from 'nock';
import expect from 'expect';
import { rxAjax } from './index';

describe('rxAjax', () => {
  const url = 'http://example.com';
  const api = '/request';
  const payload = {
    value: 'good',
  };
  afterEach(() => {
    nock.cleanAll();
  });

  it('should make a get request', () => {
    const request = {
      endpoint: `${url}${api}`,
      method: 'GET',
    };
    nock(url)
      .get(api)
      .reply(200, payload);

    rxAjax(request).subscribe(x => {
      expect(x).toEqual(payload);
    });
  });

  it('should make a get request, configuration without method field', () => {
    const request = {
      endpoint: `${url}${api}`,
    };
    nock(url)
      .get(api)
      .reply(200, payload);

    rxAjax(request).subscribe(x => {
      expect(x).toEqual(payload);
    });
  });

  it('should make a post request', () => {
    const request = {
      endpoint: `${url}${api}`,
      method: 'POST',
      payload: {
        value: 2,
      },
    };
    nock(url)
      .post(api)
      .reply(200, payload);

    rxAjax(request).subscribe(x => {
      expect(x).toEqual(payload);
    });
  });

  it('should make a put request', () => {
    const request = {
      endpoint: `${url}${api}`,
      method: 'PUT',
      payload: {
        value: 2,
      },
    };
    nock(url)
      .post(api)
      .reply(200, payload);

    rxAjax(request).subscribe(x => {
      expect(x).toEqual(payload);
    });
  });

  it('should make a delete request', () => {
    const request = {
      endpoint: `${url}${api}`,
      method: 'DELETE',
    };
    nock(url)
      .post(api)
      .reply(200, payload);

    rxAjax(request).subscribe(x => {
      expect(x).toEqual(payload);
    });
  });

  it('should throw an exception, configuration without endpoint field', () => {
    const request = {
      method: 'POST',
      payload: {
        value: 2,
      },
    };
    nock(url)
      .post(api)
      .reply(200, payload);

    expect(() => rxAjax(request)).toThrow();
  });

  it('should throw an exception, configuration without payload field', () => {
    const request = {
      endpoint: `${url}${api}`,
      method: 'POST',
    };
    nock(url)
      .post(api)
      .reply(200, payload);

    expect(() => rxAjax(request)).toThrow();
  });
});
