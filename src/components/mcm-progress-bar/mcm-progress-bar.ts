import {Component, Input} from '@angular/core';
import {Route} from "../../entity/Route";
import {Helper} from "../../classes/Helper";
import { RouteInfos } from '../../services/ApiResponseDefinition/RouteInfos';

@Component({
    selector: 'mcm-progress-bar',
    templateUrl: './mcm-progress-bar.html'
})
export class MCMProgressBarComponent {
    @Input() route?: Route;
    @Input() routeDetails?: RouteInfos;


    @Input() isAudioPlaying?: boolean;
    @Input() isAudio?: boolean;
    @Input() remainingTime?: number;
    @Input() currentProgress: number;
    @Input() total: number;
    progressWidth: number;

    constructor(private helper: Helper) {

    }

    async ngOnChanges() {
        if (this.route) {
            if (this.routeDetails) {
                try {
                    let data = await this.helper.calculateProgress(this.route, this.routeDetails);
                    this.currentProgress = data.currentProgress;
                    this.total = data.totalTasks;
                    this.progressWidth = (100 / this.total) * this.currentProgress;
                } catch (e) {
                    console.log(e);
                }
            } else {
                this.currentProgress = 0;
                this.total = 0;
                this.progressWidth = 0;
            }
        } else if(this.total && this.currentProgress){
            this.progressWidth = (100 / this.total) * this.currentProgress;
        }
    }
}
