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

import { Session } from '../models/session';
import { SessionUser } from '../models/session-user';
import { JoinSessionRequest } from '../models/join-session-request';


@Injectable()
export class SessionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @return Returns a list of FeedItems
   */

  createSessionResponse(): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session`,
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
        let _body: Session = null;
        _body = _resp.body as Session
        return _resp.clone({body: _body}) as HttpResponse<Session>;
      })
    );
  }


  /**
   * @return Returns a list of FeedItems
   */

  createSession(): Observable<Session> {
    return this.createSessionResponse().pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param trailId Trail ID
   * @return Returns a list of FeedItems
   */

  getUpcomingSessionsResponse(trailId: number): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/sessions/${trailId}/upcoming`,
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
        let _body: Session = null;
        _body = _resp.body as Session
        return _resp.clone({body: _body}) as HttpResponse<Session>;
      })
    );
  }


  /**
   * @param trailId Trail ID
   * @return Returns a list of FeedItems
   */

  getUpcomingSessions(trailId: number): Observable<Session> {
    return this.getUpcomingSessionsResponse(trailId).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param sessionId Session ID
   * @return Returns a list of FeedItems
   */

  getSessionResponse(sessionId: number): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${sessionId}`,
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
        let _body: Session = null;
        _body = _resp.body as Session
        return _resp.clone({body: _body}) as HttpResponse<Session>;
      })
    );
  }


  /**
   * @param sessionId Session ID
   * @return Returns a list of FeedItems
   */

  getSession(sessionId: number): Observable<Session> {
    return this.getSessionResponse(sessionId).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param code Code
   * @return Returns a list of FeedItems
   */

  getSessionByCodeResponse(code: string): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/find/${code}`,
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
        let _body: Session = null;
        _body = _resp.body as Session
        return _resp.clone({body: _body}) as HttpResponse<Session>;
      })
    );
  }


  /**
   * @param code Code
   * @return Returns a list of FeedItems
   */

  getSessionByCode(code: string): Observable<Session> {
    return this.getSessionByCodeResponse(code).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param params The `SessionService.JoinSessionParams` containing the following parameters:
   *
   * - `sessionId`: The session ID to join
   *
   * - `request`: Join Session Request
   *
   * @return Returns a SessionUser object
   */

  joinSessionResponse(params: SessionService.JoinSessionParams): Observable<HttpResponse<SessionUser>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.request;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session/join/${params.sessionId}`,
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
        let _body: SessionUser = null;
        _body = _resp.body as SessionUser
        return _resp.clone({body: _body}) as HttpResponse<SessionUser>;
      })
    );
  }


  /**
   * @param params The `SessionService.JoinSessionParams` containing the following parameters:
   *
   * - `sessionId`: The session ID to join
   *
   * - `request`: Join Session Request
   *
   * @return Returns a SessionUser object
   */

  joinSession(params: SessionService.JoinSessionParams): Observable<SessionUser> {
    return this.joinSessionResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param sessionId Session ID
   * @return Returns a list of FeedItems
   */

  getSessionUsersResponse(sessionId: number): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${sessionId}/users`,
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
        let _body: Session = null;
        _body = _resp.body as Session
        return _resp.clone({body: _body}) as HttpResponse<Session>;
      })
    );
  }


  /**
   * @param sessionId Session ID
   * @return Returns a list of FeedItems
   */

  getSessionUsers(sessionId: number): Observable<Session> {
    return this.getSessionUsersResponse(sessionId).pipe(
      map(_r => (<any>_r).body)
    );
  }}

export module SessionService {
  export interface JoinSessionParams {
    sessionId: number;
    request: JoinSessionRequest;
  }
}
