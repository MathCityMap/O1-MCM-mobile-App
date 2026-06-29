import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
    selector: 'mcm-intro-modal',
    templateUrl: './MCMIntroModal.html'
})
export class MCMIntroModal {

    title: string;
    message: string;
    buttons: any[];
    narrative: string;
    routeTitle: string;

    constructor(params: NavParams) {

        this.buttons = params.data.buttons;
        this.narrative = params.data.narrative;
        this.title = params.data.title;
        this.message = params.data.message;
        this.routeTitle = params.data.routeTitle


    }

}
