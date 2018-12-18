/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { SessionEventsResponse } from '../models/session-events-response';
import { EventsAddRequest } from '../models/events-add-request';


@Injectable()
export class SessionEventService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @param sessionCode The session code
   * @return Returns all events of the session
   */

  getEventsResponse(sessionCode: string): Observable<HttpResponse<SessionEventsResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${sessionCode}/event`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: SessionEventsResponse = null;
        _body = _resp.body as SessionEventsResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionEventsResponse>;
      })
    );
  }


  /**
   * @param sessionCode The session code
   * @return Returns all events of the session
   */

  getEvents(sessionCode: string): Observable<SessionEventsResponse> {
    return this.getEventsResponse(sessionCode).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionEventService.GetUserEventsParams` containing the following parameters:
   *
   * - `userToken`: The user token
   *
   * - `sessionCode`: The session code
   *
   * @return Returns all events of the session for given user token
   */

  getUserEventsResponse(params: SessionEventService.GetUserEventsParams): Observable<HttpResponse<SessionEventsResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${params.sessionCode}/user/${params.userToken}/events`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: SessionEventsResponse = null;
        _body = _resp.body as SessionEventsResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionEventsResponse>;
      })
    );
  }


  /**
   * @param params The `SessionEventService.GetUserEventsParams` containing the following parameters:
   *
   * - `userToken`: The user token
   *
   * - `sessionCode`: The session code
   *
   * @return Returns all events of the session for given user token
   */

  getUserEvents(params: SessionEventService.GetUserEventsParams): Observable<SessionEventsResponse> {
    return this.getUserEventsResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionEventService.AddEventsParams` containing the following parameters:
   *
   * - `userToken`: userToken of sending user
   *
   * - `sessionCode`: The session code
   *
   * - `events`: An array of user events
   *
   * @return Returns added event
   */

  addEventsResponse(params: SessionEventService.AddEventsParams): Observable<HttpResponse<SessionEventsResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.events;
    console.log(__body);
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session/${params.sessionCode}/user/${params.userToken}/events`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });
    console.log(req);

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: SessionEventsResponse = null;
        _body = _resp.body as SessionEventsResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionEventsResponse>;
      })
    );
  }


  /**
   * @param params The `SessionEventService.AddEventsParams` containing the following parameters:
   *
   * - `userToken`: userToken of sending user
   *
   * - `sessionCode`: The session code
   *
   * - `events`: An array of user events
   *
   * @return Returns added event
   */

  addEvents(params: SessionEventService.AddEventsParams): Observable<SessionEventsResponse> {
    return this.addEventsResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }
}

export module SessionEventService {
  export interface GetUserEventsParams {
    userToken: string;
    sessionCode: string;
  }
  export interface AddEventsParams {
    userToken: string;
    sessionCode: string;
    events: EventsAddRequest;
  }
}
