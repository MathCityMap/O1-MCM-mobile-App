import {EventEmitter, Component, Input, Output} from '@angular/core';
import {Route} from "../../entity/Route";
import {ModalsService} from "../../services/modals-service";
import {OrmService} from "../../services/orm-service";
import {Helper} from "../../classes/Helper";


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

  private currentProgress: number = 0;
  private total: number = 0;

  constructor( private modalsService: ModalsService,
               private ormService: OrmService,
               private helper: Helper) {
  }

  async ngOnInit(){
    let data = await this.helper.calculateProgress(this.route)
    this.currentProgress = data.currentProgress;
    this.total = data.totalTasks;
  }

  async doDownload(event, route: Route) {
    event.stopPropagation();
    if (await this.modalsService.doDownload(route)) {
      this.downloadRoute.emit({route: route});
    }
  }

  async deleteRoute(event, route: Route) {
    event.stopPropagation();
    if(await this.ormService.removeDownloadedRoute(route)){
      this.removeRoute.emit();
    }
  }

}
