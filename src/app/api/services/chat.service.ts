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
import { Message } from '../models/message';


@Injectable()
export class ChatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @return Returns a list of FeedItems
   */

  sendMessageToUserResponse(): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session/message/user`,
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

  sendMessageToUser(): Observable<Session> {
    return this.sendMessageToUserResponse().pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @return Returns a list of FeedItems
   */

  sendMessageToUsersResponse(): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session/message/all`,
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

  sendMessageToUsers(): Observable<Session> {
    return this.sendMessageToUsersResponse().pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param params The `ChatService.GetChatParams` containing the following parameters:
   *
   * - `sessionId`: Session ID
   *
   * - `selfUserId`: Self User ID
   *
   * - `otherUserId`: Other User ID
   *
   * @return Returns a list of FeedItems
   */

  getChatResponse(params: ChatService.GetChatParams): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${params.sessionId}/message/${params.selfUserId}/${params.otherUserId}`,
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
   * @param params The `ChatService.GetChatParams` containing the following parameters:
   *
   * - `sessionId`: Session ID
   *
   * - `selfUserId`: Self User ID
   *
   * - `otherUserId`: Other User ID
   *
   * @return Returns a list of FeedItems
   */

  getChat(params: ChatService.GetChatParams): Observable<Session> {
    return this.getChatResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param params The `ChatService.GetUserMessageCreatedParams` containing the following parameters:
   *
   * - `userId`: User ID
   *
   * - `sessionId`: Session ID
   *
   * @return Returns a list of FeedItems
   */

  getUserMessageCreatedResponse(params: ChatService.GetUserMessageCreatedParams): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/getUserMessagesCreated/${params.sessionId}/${params.userId}`,
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
   * @param params The `ChatService.GetUserMessageCreatedParams` containing the following parameters:
   *
   * - `userId`: User ID
   *
   * - `sessionId`: Session ID
   *
   * @return Returns a list of FeedItems
   */

  getUserMessageCreated(params: ChatService.GetUserMessageCreatedParams): Observable<Session> {
    return this.getUserMessageCreatedResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param params The `ChatService.GetUserMessageReceivedParams` containing the following parameters:
   *
   * - `userId`: User ID
   *
   * - `sessionId`: Session ID
   *
   * @return Returns a list of FeedItems
   */

  getUserMessageReceivedResponse(params: ChatService.GetUserMessageReceivedParams): Observable<HttpResponse<Session>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/getUserMessagesReceived/${params.sessionId}/${params.userId}`,
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
   * @param params The `ChatService.GetUserMessageReceivedParams` containing the following parameters:
   *
   * - `userId`: User ID
   *
   * - `sessionId`: Session ID
   *
   * @return Returns a list of FeedItems
   */

  getUserMessageReceived(params: ChatService.GetUserMessageReceivedParams): Observable<Session> {
    return this.getUserMessageReceivedResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }

  /**
   * @param userToken The session user's token
   * @return Returns a list of messages
   */

  getMessagesResponse(userToken: string): Observable<HttpResponse<Message[]>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/sessionUser/${userToken}/messages`,
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
        let _body: Message[] = null;
        _body = _resp.body as Message[]
        return _resp.clone({body: _body}) as HttpResponse<Message[]>;
      })
    );
  }


  /**
   * @param userToken The session user's token
   * @return Returns a list of messages
   */

  getMessages(userToken: string): Observable<Message[]> {
    return this.getMessagesResponse(userToken).pipe(
      map(_r => (<any>_r).body)
    );
  }}

export module ChatService {
  export interface GetChatParams {
    sessionId: number;
    selfUserId: number;
    otherUserId: number;
  }
  export interface GetUserMessageCreatedParams {
    userId: number;
    sessionId: number;
  }
  export interface GetUserMessageReceivedParams {
    userId: number;
    sessionId: number;
  }
}
