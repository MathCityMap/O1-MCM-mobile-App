import {EventEmitter, ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Route} from "../../entity/Route";
import {ModalsService} from "../../services/modals-service";
import {OrmService} from "../../services/orm-service";

/**
 * Generated class for the RouteTeaserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */


@Component({
  selector: 'route-teaser',
  templateUrl: 'route-teaser.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteTeaserComponent {

  @Input()
  route: Route;

  @Input()
  isOnline: boolean;

  @Output()
  downloadRoute = new EventEmitter<any>();

  @Output()
  removeRoute = new EventEmitter<any>();

  constructor( private modalsService: ModalsService,
               private ormService: OrmService) {
  }

  async doDownload(event, route: Route) {
    event.stopPropagation();
    if (await this.modalsService.doDownload(route)) {
      this.downloadRoute.emit({route: route});
    }
  }

  async deleteRoute(route) {
    event.stopPropagation();
    if(await this.ormService.removeDownloadedRoute(route)){
      this.removeRoute.emit();
    }
  }

}
