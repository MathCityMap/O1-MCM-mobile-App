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

import { SessionChatResponse } from '../models/session-chat-response';
import { SessionChatMessageResponse } from '../models/session-chat-message-response';
import { SessionChatMessageRequest } from '../models/session-chat-message-request';


@Injectable()
export class SessionChatService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  /**
   * @param params The `SessionChatService.GetMessagesParams` containing the following parameters:
   *
   * - `sessionCode`: The session code
   *
   * - `senderToken`: The senders token
   *
   * - `receiverToken`: The receiver token
   *
   * @return Returns the chat - inclusive chat history
   */

  getMessagesResponse(params: SessionChatService.GetMessagesParams): Observable<HttpResponse<SessionChatResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/session/${params.sessionCode}/chat/${params.senderToken}/${params.receiverToken}`,
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
        let _body: SessionChatResponse = null;
        _body = _resp.body as SessionChatResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionChatResponse>;
      })
    );
  }


  /**
   * @param params The `SessionChatService.GetMessagesParams` containing the following parameters:
   *
   * - `sessionCode`: The session code
   *
   * - `senderToken`: The senders token
   *
   * - `receiverToken`: The receiver token
   *
   * @return Returns the chat - inclusive chat history
   */

  getMessages(params: SessionChatService.GetMessagesParams): Observable<SessionChatResponse> {
    return this.getMessagesResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionChatService.SendMessageToUserParams` containing the following parameters:
   *
   * - `sessionCode`: The session code
   *
   * - `senderToken`: The senders token
   *
   * - `receiverToken`: The receiver token
   *
   * - `chatMessage`: The message
   *
   * @return Returns sended chat message
   */

  sendMessageToUserResponse(params: SessionChatService.SendMessageToUserParams): Observable<HttpResponse<SessionChatMessageResponse>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    __body = params.chatMessage;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session/${params.sessionCode}/chat/${params.senderToken}/${params.receiverToken}`,
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
        let _body: SessionChatMessageResponse = null;
        _body = _resp.body as SessionChatMessageResponse
        return _resp.clone({body: _body}) as HttpResponse<SessionChatMessageResponse>;
      })
    );
  }


  /**
   * @param params The `SessionChatService.SendMessageToUserParams` containing the following parameters:
   *
   * - `sessionCode`: The session code
   *
   * - `senderToken`: The senders token
   *
   * - `receiverToken`: The receiver token
   *
   * - `chatMessage`: The message
   *
   * @return Returns sended chat message
   */

  sendMessageToUser(params: SessionChatService.SendMessageToUserParams): Observable<SessionChatMessageResponse> {
    return this.sendMessageToUserResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }


  /**
   * @param params The `SessionChatService.SendMessageToUsersParams` containing the following parameters:
   *
   * - `sessionCode`: The session code
   *
   * - `senderToken`: The senders token
   *
   * - `chatMessage`: The message
   */

  sendMessageToUsersResponse(params: SessionChatService.SendMessageToUsersParams): Observable<HttpResponse<void>> {
    let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.chatMessage;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/session/${params.sessionCode}/chat/${params.senderToken}`,
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
   * @param params The `SessionChatService.SendMessageToUsersParams` containing the following parameters:
   *
   * - `sessionCode`: The session code
   *
   * - `senderToken`: The senders token
   *
   * - `chatMessage`: The message
   */

  sendMessageToUsers(params: SessionChatService.SendMessageToUsersParams): Observable<void> {
    return this.sendMessageToUsersResponse(params).pipe(
      map(_r => (<any>_r).body)
    );
  }
}

export module SessionChatService {
  export interface GetMessagesParams {
    sessionCode: string;
    senderToken: string;
    receiverToken: string;
  }
  export interface SendMessageToUserParams {
    sessionCode: string;
    senderToken: string;
    receiverToken: string;
    chatMessage: SessionChatMessageRequest;
  }
  export interface SendMessageToUsersParams {
    sessionCode: string;
    senderToken: string;
    chatMessage: SessionChatMessageRequest;
  }
}
