import {Injectable} from "@angular/core";
import {checkAvailability} from "@ionic-native/core";


@Injectable()
export class ImagesService {

  constructor() {
  }

  getUrlForImage(image: string): string {
    return "http://mathcitymap.eu/wp-content/themes/mcm/images/mcm_logo_white.png";
  }
}
