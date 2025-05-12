/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  rootUrl: string = "https://api.mathcitymap.eu/public/index.php" // http://localhost/;
  // rootUrl: string = "https://api-dev.mathcitymap.eu/public/index.php";
  // rootUrl: string = "http://192.168.178.28/mcmapi";
}
