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


@Injectable()
export class TrailService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @param trailId Trail ID
   * @return Returns a list of FeedItems
   */

  getUpcomingSessionsResponse(trailId: number): Observable<HttpResponse<Array<Session>>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/trail/${trailId}/sessions/upcoming`,
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
        let _body: Array<Session> = null;
        _body = _resp.body as Array<Session>
        return _resp.clone({body: _body}) as HttpResponse<Array<Session>>;
      })
    );
  }


  /**
   * @param trailId Trail ID
   * @return Returns a list of FeedItems
   */

  getUpcomingSessions(trailId: number): Observable<Array<Session>> {
    return this.getUpcomingSessionsResponse(trailId).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param trailId Trail ID
   * @return Returns a list of FeedItems
   */

  getSessionsResponse(trailId: number): Observable<HttpResponse<Array<Session>>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/trail/${trailId}/sessions`,
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
        let _body: Array<Session> = null;
        _body = _resp.body as Array<Session>
        return _resp.clone({body: _body}) as HttpResponse<Array<Session>>;
      })
    );
  }


  /**
   * @param trailId Trail ID
   * @return Returns a list of FeedItems
   */

  getSessions(trailId: number): Observable<Array<Session>> {
    return this.getSessionsResponse(trailId).pipe(
      map(_r => (<any>_r).body)
    );
  }
}

export module TrailService {
}
