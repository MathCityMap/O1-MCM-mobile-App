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

import { LeaderboardResponse } from '../models/leaderboard-response';


@Injectable()
export class SessionUserLeaderboardService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @param params The `SessionUserLeaderboardService.GetLeaderboardParams` containing the following parameters:
   *
   * - `userToken`: The session user's token
   *
   * - `sessionCode`: The session code
   *
   * @return Returns Leaderboard array
   */

  getLeaderboardResponse(params: SessionUserLeaderboardService.GetLeaderboardParams): Observable<HttpResponse<LeaderboardResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${params.sessionCode}/user/${params.userToken}/leaderboard`,
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
        let _body: LeaderboardResponse = null;
        _body = _resp.body as LeaderboardResponse
        return _resp.clone({body: _body}) as HttpResponse<LeaderboardResponse>;
      })
    );
  }


  /**
   * @param params The `SessionUserLeaderboardService.GetLeaderboardParams` containing the following parameters:
   *
   * - `userToken`: The session user's token
   *
   * - `sessionCode`: The session code
   *
   * @return Returns Leaderboard array
   */

  getLeaderboard(params: SessionUserLeaderboardService.GetLeaderboardParams): Observable<LeaderboardResponse> {
    return this.getLeaderboardResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }
}

export module SessionUserLeaderboardService {
  export interface GetLeaderboardParams {
    userToken: string;
    sessionCode: string;
  }
}
