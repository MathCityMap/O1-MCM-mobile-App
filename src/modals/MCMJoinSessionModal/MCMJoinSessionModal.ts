import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
    selector: 'mcm-join-session-modal',
    templateUrl:'./MCMJoinSessionModal.html'
})
export class MCMJoinSessionModal {
    @ViewChild('input') input;

    teamName: string;
    teamMemberNames: string;
    teamMemberArray: string[] = [];
    showError: boolean;

    constructor(private viewCtrl: ViewController) {

    }

    // ionViewDidEnter() {
    //     setTimeout(() => {
    //         this.input.setFocus();
    //     }, 150);
    // }

    cancel() {
        this.viewCtrl.dismiss();
    }

    addTeamMemberName(name: string) {
        console.log(name);
        this.teamMemberArray.push(name);
        this.teamMemberNames = '';
    }

}