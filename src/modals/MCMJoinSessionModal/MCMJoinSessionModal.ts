import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController, NavParams } from 'ionic-angular';
import { Session } from '../../app/api/models/session';
import { OrmService } from '../../services/orm-service';
import { ModalsService } from '../../services/modals-service';
import { ChatAndSessionService } from '../../services/chat-and-session-service';

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

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private ormService: OrmService,
                private modalsService: ModalsService, private sessionService: ChatAndSessionService) {
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
        if(this.teamMemberNames != null && this.teamMemberNames != "") {
            this.teamMemberArray.push(this.teamMemberNames);
            this.teamMemberNames = "";
        }
        let route = await this.ormService.findRouteById(this.session.trail_id);
        try{
            await this.sessionService.setActiveSession(this.session, this.teamName, this.teamMemberArray);
            this.cancel();
            await this.ormService.unlockRoute(route);
            this.modalsService.showRoute(route, this.navCtrl)
        }
        catch(e){
            this.cancel();
            this.modalsService.showDialog('a_session_not_available_yet', 'a_session_not_available_yet_text',
                'a_g_ok', () => {});
        }
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