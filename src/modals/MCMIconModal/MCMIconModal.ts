import { Component,Input, Inject} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { MCMModalType } from '../../app/app.component';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
    selector: 'mcm-icon-modal',
    templateUrl:'./MCMIconModal.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMIconModal{

    title: string;
    type: string;
    imageUrl: string;
    message: string;
    messages: string[];
    param: any;
    modalType: MCMModalType;
    linkyOptions: any;
    buttons: any[];
    constructor(params: NavParams, private viewCtrl: ViewController) {
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
                    case MCMModalType.success:
                        this.title = "a_alert_right_answer_title";

                        break;
                }
            }

            this.message = params.data.message;
            this.messages = params.data.messages;
            this.imageUrl = params.data.imageUrl;
            this.type = params.data.type;
        }
        this.param = {L: params.data.solution};

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