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



@Injectable()
export class SessionUserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @param params The `SessionUserService.UpdatePositionParams` containing the following parameters:
   *
   * - `userToken`: The session user's token
   *
   * - `longitude`: The session user's longitude
   *
   * - `latitude`: The session user's latitude
   *
   * @return Returns an empty response
   */

  updatePositionResponse(params: SessionUserService.UpdatePositionParams): Observable<HttpResponse<any>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/sessionUser/${params.userToken}/updatePosition/${params.latitude}/${params.longitude}`,
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
        let _body: any = null;

        return _resp.clone({body: _body}) as HttpResponse<any>;
      })
    );
  }


  /**
   * @param params The `SessionUserService.UpdatePositionParams` containing the following parameters:
   *
   * - `userToken`: The session user's token
   *
   * - `longitude`: The session user's longitude
   *
   * - `latitude`: The session user's latitude
   *
   * @return Returns an empty response
   */

  updatePosition(params: SessionUserService.UpdatePositionParams): Observable<any> {
    return this.updatePositionResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }}

export module SessionUserService {
  export interface UpdatePositionParams {
    userToken: string;
    longitude: number;
    latitude: number;
  }
}
