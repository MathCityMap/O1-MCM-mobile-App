import {EventEmitter, ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Route} from "../../entity/Route";
import {ModalsService} from "../../services/modals-service";
import {OrmService} from "../../services/orm-service";


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

    private totalTasks: number;
    private currentProgress = 0;

  constructor( private modalsService: ModalsService,
               private ormService: OrmService) {
  }

    async ionViewWillEnter() {
        this.totalTasks = await this.route.getTaskCount();
        let score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
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
