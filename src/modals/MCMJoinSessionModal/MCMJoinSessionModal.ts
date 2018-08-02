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
    codeInput: boolean = false;

    constructor(private viewCtrl: ViewController) {

    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.input.setFocus();
        }, 150);
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    // TODO Needs rework by Filip
    // start() {
    //     console.log(this.teamName);
    //     if(this.teamMemberNames != null && this.teamMemberNames != "") {
    //         this.teamMemberArray.push(this.teamMemberNames);
    //     }
    //     console.log(this.teamMemberArray);
    // }

    checkInputField() {
        if(this.teamName != "" && this.teamName != null){
            if(this.teamMemberNames != "" && this.teamMemberNames != null) {
                this.codeInput = true;
            }
            else if(this.teamMemberArray.length != 0) {
                //Funktioniert, wenn sich Array-Einträge dynamisch anpassen, bei Neubennenung 
                if (this.teamMemberArray.some(function (element) {if (element != "" && element != undefined) {return true;} else {return false;}})) {
                    this.codeInput = true;
                }
                else {
                    this.codeInput = false;
                }
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
        this.teamMemberArray.push(name);
        this.teamMemberNames = '';
    }

    removeTeamMemberName(index: number) {
        this.teamMemberArray.splice(index,1);
    }

    start() {
        console.log('test');
    }
}