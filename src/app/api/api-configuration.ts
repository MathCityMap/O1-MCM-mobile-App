/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  rootUrl: string = "http://mcm-api.local.autentek.de:8080/index.php" // http://localhost/;
}
