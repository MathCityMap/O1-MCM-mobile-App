import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { MCMModalType } from '../../app/app.component';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {ModalController, Platform} from 'ionic-angular';
import { ImagesService } from '../../services/images-service';
import {MCMReportProblemModal} from "../MCMReportProblemModal/MCMReportProblemModal";

declare var MathJax;

@Component({
    selector: 'mcm-icon-modal',
    templateUrl:'./MCMIconModal.html',
})
export class MCMIconModal{

    title: string;
    type: string;
    imageUrl: string;
    videoId: string;
    message: string;
    messages: string[];
    taskDescription: string;
    param: any;
    modalType: MCMModalType;
    linkyOptions: any;
    buttons: any[];
    gamificationEnabled: boolean = false;
    narrativeEnabled: boolean = false;
    score: string;
    narrative: string;
    iconPath: string;
    taskCode: string;
    contentLanguage: string;

    windowWith: number;
    videoWith: number;
    videoHeight: number;

    constructor(params: NavParams, private viewCtrl: ViewController, platform: Platform, public imagesService: ImagesService, public modalCtrl: ModalController) {
        this.windowWith = platform.width();
        this.videoWith = this.windowWith - 80;
        this.videoHeight = this.videoWith * 0.7476923077;

        if(!params.data.modalType){
            console.warn("Please provide the modalType!");
        }else{
            this.modalType = params.data.modalType;
            this.buttons = params.data.buttons;
            if(params.data.title){
                if (params.data.title === 'hide') {
                    this.title = undefined
                } else {
                    this.title = params.data.title;
                }
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
            this.taskDescription = params.data.taskDescription;
            this.message = params.data.message;
            this.messages = params.data.messages;
            this.taskCode = params.data.taskCode;
            this.imageUrl = params.data.imageUrl;
            this.contentLanguage = params.data.contentLanguage;
            this.type = params.data.type;
            if (this.type == 'video' && this.message) {
                let parts = this.message.split('v=');
                if (parts.length == 2) {
                    this.videoId = parts[1];
                }
            }
        }
        if(params.data.param){
            this.param = params.data.param;
        }
        if(params.data.solution){
            let sol = params.data.solution as Array<string>;
            // let L: any; let K: any; let J: any; let H: any;
            let variables = ["L", "K", "J", "H"];
            if (!this.param) {
                this.param = {};
            }
            for(let i = 0; i < sol.length; i++){
                let currVar = variables[i];
                this.param[currVar] = params.data.solution[i];
            }
        }
        if(params.data.gamificationEnabled){
            this.gamificationEnabled = params.data.gamificationEnabled;
        }
        if(params.data.narrativeEnabled){
            this.narrativeEnabled = params.data.narrativeEnabled;
        }
        if(params.data.narrative) {
            this.narrative = params.data.narrative;
            switch (this.narrative) {
                case 'pirates':
                    this.iconPath = 'pirates/';
                    break;
                default:
                    this.iconPath = '';
            }
        } else {
            this.iconPath = '';
        }
        if(params.data.score){
            this.score = params.data.score;
        }

        this.linkyOptions = {
            replaceFn : function( match ) {
                console.log( "href = ", match.getAnchorHref() );
                console.log( "text = ", match.getAnchorText() );
                return '<a href="'+match.getAnchorHref()+'">' + match.getAnchorText() + '</a>';
            }
        }

        // replace the ###KEY### in titles and messages
        if (this.narrativeEnabled) {
            for (var key in this.param) {
                this.title = this.title.replace("###"+key+"###", this.param[key]);
                this.message = this.message.replace("###"+key+"###", this.param[key]);
            }
        }
    }

    ionViewDidEnter() {
        MathJax.typeset();
    }

    dismiss(backToMap?: boolean){
        if(backToMap){
            this.viewCtrl.dismiss({showMap: true});
        }else{
            this.viewCtrl.dismiss();
        }
    }

    reportProblem() {
        const feedbackOpenFunction = () => {
            const problemReportModal = this.modalCtrl.create(MCMReportProblemModal, {
                taskCode: this.taskCode
            });
            problemReportModal.present();
        };
        const confirmationModal = this.modalCtrl.create(MCMIconModal, {
            type: 'text',
            title: "a_task_feedback_alert_title",
            message: "a_task_feedback_alert_text",
            modalType: MCMModalType.general,
            buttons: [
                {
                    title: 'a_alert_cancel',
                    callback: () => {
                        confirmationModal.dismiss();
                    }
                },
                {
                    title: 'a_alert_continue',
                    callback: () => {
                        feedbackOpenFunction();
                        confirmationModal.dismiss();
                    }
                }
            ]

        }, {showBackdrop: true, enableBackdropDismiss: true});
        confirmationModal.present();
    }

    protected readonly MCMModalType = MCMModalType;
}
