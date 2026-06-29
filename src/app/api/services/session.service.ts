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
import { SessionCreateRequest } from '../models/session-create-request';
import { SessionUpdateRequest } from '../models/session-update-request';
import { SessionUser } from '../models/session-user';
import { JoinSessionRequest } from '../models/join-session-request';
import { SessionUsersResponse } from '../models/session-users-response';
import { SessionUserResponse } from '../models/session-user-response';


@Injectable()
export class SessionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @param sessionCreateRequest session data
   * @return Return created session
   */

  createSessionResponse(sessionCreateRequest: SessionCreateRequest): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = sessionCreateRequest;
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
   * @param sessionCreateRequest session data
   * @return Return created session
   */

  createSession(sessionCreateRequest: SessionCreateRequest): Observable<Session> {
    return this.createSessionResponse(sessionCreateRequest).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionService.UpdateSessionParams` containing the following parameters:
   *
   * - `sessionUpdateRequest`: session data
   *
   * - `sessionCode`: The session Code to join
   *
   * @return Return updated Session
   */

  updateSessionResponse(params: SessionService.UpdateSessionParams): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.sessionUpdateRequest;

    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/session/${params.sessionCode}`,
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
   * @param params The `SessionService.UpdateSessionParams` containing the following parameters:
   *
   * - `sessionUpdateRequest`: session data
   *
   * - `sessionCode`: The session Code to join
   *
   * @return Return updated Session
   */

  updateSession(params: SessionService.UpdateSessionParams): Observable<Session> {
    return this.updateSessionResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param sessionCode The session Code to join
   */

  deleteSessionResponse(sessionCode: string): Observable<HttpResponse<void>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/session/${sessionCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }


  /**
   * @param sessionCode The session Code to join
   */

  deleteSession(sessionCode: string): Observable<void> {
    return this.deleteSessionResponse(sessionCode).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionService.JoinSessionParams` containing the following parameters:
   *
   * - `sessionCode`: The session Code to join
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
      this.rootUrl + `/session/join/${params.sessionCode}`,
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
   * - `sessionCode`: The session Code to join
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
   * @return Returns requested Session
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
   * @return Returns requested Session
   */

  getSession(sessionId: number): Observable<Session> {
    return this.getSessionResponse(sessionId).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param code Code
   * @return Returns requested Session
   */

  getSessionByCodeResponse(code: string): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/code/${code}`,
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
   * @return Returns requested Session
   */

  getSessionByCode(code: string): Observable<Session> {
    return this.getSessionByCodeResponse(code).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param sessionCode Session Code
   * @return Returns a list of SessionUsers
   */

  getSessionUsersResponse(sessionCode: string): Observable<HttpResponse<SessionUsersResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${sessionCode}/users`,
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
        let _body: SessionUsersResponse = null;
        _body = _resp.body as SessionUsersResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionUsersResponse>;
      })
    );
  }


  /**
   * @param sessionCode Session Code
   * @return Returns a list of SessionUsers
   */

  getSessionUsers(sessionCode: string): Observable<SessionUsersResponse> {
    return this.getSessionUsersResponse(sessionCode).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionService.GetSessionAdminParams` containing the following parameters:
   *
   * - `userToken`: requesting user token
   *
   * - `sessionCode`: Session Code
   *
   * @return Get session admin
   */

  getSessionAdminResponse(params: SessionService.GetSessionAdminParams): Observable<HttpResponse<SessionUserResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${params.sessionCode}/user/${params.userToken}/admin`,
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
        let _body: SessionUserResponse = null;
        _body = _resp.body as SessionUserResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionUserResponse>;
      })
    );
  }


  /**
   * @param params The `SessionService.GetSessionAdminParams` containing the following parameters:
   *
   * - `userToken`: requesting user token
   *
   * - `sessionCode`: Session Code
   *
   * @return Get session admin
   */

  getSessionAdmin(params: SessionService.GetSessionAdminParams): Observable<SessionUserResponse> {
    return this.getSessionAdminResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }
}

export module SessionService {
  export interface UpdateSessionParams {
    sessionUpdateRequest: SessionUpdateRequest;
    sessionCode: string;
  }
  export interface JoinSessionParams {
    sessionCode: string;
    request: JoinSessionRequest;
  }
  export interface GetSessionAdminParams {
    userToken: string;
    sessionCode: string;
  }
}
