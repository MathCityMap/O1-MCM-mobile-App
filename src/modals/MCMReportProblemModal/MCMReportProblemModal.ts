import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {ModalController, NavParams} from 'ionic-angular';
import {ImagesService} from "../../services/images-service";
import {ProblemReportService} from "../../app/api/services/problem-report.service";
import {Helper} from "../../classes/Helper";
import {MCMIconModal} from "../MCMIconModal/MCMIconModal";
import {MCMModalType} from "../../app/app.component";



@Component({
    selector: 'mcm-route-by-code-modal',
    templateUrl:'./MCMReportProblemModal.html'
})
export class MCMReportProblemModal {
    @ViewChild('input') input;

    taskCode: string;
    showError: boolean;
    problemTypes = [
        {key: "no_exist", value: "a_reportType_no_exist"},
        {key: "access_restricted", value: "a_reportType_access_restricted"},
        {key: "pin_wrong", value: "a_reportType_pin_wrong"},
        {key: "data_wrong", value: "a_reportType_data_wrong"},
        {key: "values_wrong", value: "a_reportType_values_wrong"},
        {key: "solution_wrong", value: "a_reportType_solution_wrong"},
        {key: "misc", value: "a_reportType_misc"},
    ];
    selectedProblems: Array<string> = [];
    information: string = "";
    image: {imageData: string, base64: string};
    sendingReport = false;

    constructor(
        private viewCtrl: ViewController,
        navParams: NavParams,
        private imageService: ImagesService,
        private prService: ProblemReportService,
        private modalCtrl: ModalController
    ) {
        this.taskCode = navParams.data.taskCode;
    }

    ionViewDidEnter() {
    }

    async getImageFromGallery() {
        this.image = await this.imageService.getImageFromUserGallery();
    }

    async getImageFromCamera() {
        this.image = await this.imageService.getImageFromCamera();
    }

    resetImage() {
        this.image = undefined;
    }

    async sendReport() {
        if (this.sendingReport) return;
        this.sendingReport = true;
        try {
        let imageUrls;
        if (this.image) {
            let blob = this.prService.convertDataUriToBlob(this.image.base64);
            imageUrls = await this.prService.uploadImage(blob, this.taskCode);
        }
        let promises = [];
        for (let problemType of this.selectedProblems) {
            promises.push(this.prService.sendReports(this.taskCode, problemType, this.information, (imageUrls ? Helper.MEDIASERVER_IMAGE_URL + imageUrls.responseData.mediumUrl : "")));
        }
        await Promise.all(promises);
        const successModal = this.modalCtrl.create(MCMIconModal, {
            type: 'text',
            title: "a_task_feedback_success_title",
            message: "a_task_feedback_success_text",
            modalType: MCMModalType.general,
            buttons: [
                {
                    title: 'a_alert_continue',
                    callback: () => {
                        successModal.dismiss();
                    }
                }
            ]
        }, {showBackdrop: true, enableBackdropDismiss: true});
        await this.viewCtrl.dismiss();
        await successModal.present();
        } catch (e) {
            this.showError = true;
        } finally {
            this.sendingReport = false;
        }
    }

     cancel() {
        this.viewCtrl.dismiss();
    }
}
