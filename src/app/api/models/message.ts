/* tslint:disable */
import { SessionUser } from './session-user';
import { Session } from './session';


export class Message {
    id?: any;
    author?: SessionUser;
    session?: Session;
    text?: string;
    messagecol?: string;
    created_at?: string;
    updated_at?: string;
}
