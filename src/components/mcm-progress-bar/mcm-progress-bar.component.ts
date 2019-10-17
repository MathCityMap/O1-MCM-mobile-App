import { Component,Input} from '@angular/core';

@Component({
    selector: 'mcm-progress-bar',
    templateUrl:'./mcm-progress-bar.component.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMProgressBarComponent{
    @Input() currentProgress: number;
    @Input() total: number ;

    progressWidth: number;

    constructor() {}

    ngOnInit(){
        this.progressWidth = (100/ this.total )*this.currentProgress;
    }
}