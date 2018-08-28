/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  rootUrl: string = "http://api.mathcitymap.eu/public/index.php" // http://localhost/;
  // rootUrl: string = "http://api-mcm.local.autentek.de"
}
