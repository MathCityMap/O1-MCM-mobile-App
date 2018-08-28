import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController, NavParams } from 'ionic-angular';
import { Session } from '../../app/api/models/session';
import { OrmService } from '../../services/orm-service';
import { ModalsService } from '../../services/modals-service';


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
    codeInput: boolean = false;
    session: Session;
    navCtrl: NavController;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private ormService: OrmService) {
        this.session = navParams.data.session;
        this.navCtrl = navParams.data.navCtrl;
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.input.setFocus();
        }, 150);
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    async start() {
        console.log(this.teamName);
        if(this.teamMemberNames != null && this.teamMemberNames != "") {
            this.teamMemberArray.push(this.teamMemberNames);
            this.teamMemberNames = "";
        }
        console.log(this.teamMemberArray);
        console.log(this.session);
        let route = await this.ormService.findRouteById(this.session.trail_id);
        console.log(route);
        this.cancel();
        // this.modalsService.showRoute(route, this.navCtrl)
     }

    checkInputField() {
        if(this.teamName != "" && this.teamName != null){
            if(this.teamMemberNames != "" && this.teamMemberNames != null) {
                this.codeInput = true;
            }
            else if(this.teamMemberArray.length != 0) {
                this.codeInput = true;
            }
            else {
                this.codeInput = false;
            }

        }
        else {
            this.codeInput = false;
        }
        return this.codeInput;
    }



    addTeamMemberName(name: string) {
        if(this.teamMemberNames != "" && this.teamMemberNames != null) {
            this.teamMemberArray.push(name);
            this.teamMemberNames = '';
        }
    }

    removeTeamMemberName(index: number) {
        this.teamMemberArray.splice(index,1);
    }


}