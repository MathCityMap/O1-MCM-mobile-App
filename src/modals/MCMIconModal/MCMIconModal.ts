import { Component,Input, Inject} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { MCMModalType } from '../../app/app.component';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Platform } from 'ionic-angular';


@Component({
    selector: 'mcm-icon-modal',
    templateUrl:'./MCMIconModal.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMIconModal{

    title: string;
    type: string;
    imageUrl: string;
    videoId: string;
    message: string;
    messages: string[];
    param: any;
    modalType: MCMModalType;
    linkyOptions: any;
    buttons: any[];

    windowWith: number;
    videoWith: number;
    videoHeight: number;

    constructor(params: NavParams, private viewCtrl: ViewController, platform: Platform) {
        this.windowWith = platform.width();
        this.videoWith = this.windowWith - 80;
        this.videoHeight = this.videoWith * 0.7476923077;

        if(!params.data.modalType){
            console.warn("Please provide the modalType!");
        }else{
            this.modalType = params.data.modalType;
            this.buttons = params.data.buttons;
            if(params.data.title){
                this.title = params.data.title;
            }else{
                switch (this.modalType){
                    case MCMModalType.hint:
                        this.title = "a_btn_hint1";
                        break;
                    case MCMModalType.error:
                        this.title = "a_alert_false_answer_title";
                        break;
                    case MCMModalType.solved:
                        this.title = "a_alert_right_answer_title";
                        break;
                    case MCMModalType.solvedLow:
                        this.title = "a_alert_right_answer_title_low";
                        break;
                }
            }

            this.message = params.data.message;
            this.messages = params.data.messages;
            this.imageUrl = params.data.imageUrl;
            this.type = params.data.type;
            if (this.type == 'video' && this.message) {
                let parts = this.message.split('v=');
                if (parts.length == 2) {
                    this.videoId = parts[1];
                }
            }
        }

        if(params.data.solutions){
            this.param = {L: params.data.solutions[0], K: params.data.solutions[1]};
        }
        else if(params.data.solution){
            this.param = {L: params.data.solution};
        }
        if(params.data.param){
            this.param = params.data.param;
        }

        this.linkyOptions = {
            replaceFn : function( match ) {
                console.log( "href = ", match.getAnchorHref() );
                console.log( "text = ", match.getAnchorText() );
                return '<a href="'+match.getAnchorHref()+'">' + match.getAnchorText() + '</a>';
            }
        }
    }

    dismiss(backToMap?: boolean){
        if(backToMap){
            this.viewCtrl.dismiss({showMap: true});
        }else{
            this.viewCtrl.dismiss();
        }
    }

}