/* tslint:disable */
import { Injectable } from '@angular/core';
import {API_URL} from "../../env/env";

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
    //FIXME Refactor users of this variable to use env.ts variable directly
  rootUrl: string = API_URL;
}
