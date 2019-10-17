import { Component,Input} from '@angular/core';

@Component({
    selector: 'mcm-progress-bar',
    templateUrl:'./mcm-progress-bar.html'
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
