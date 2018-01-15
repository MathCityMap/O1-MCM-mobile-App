import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    language: string;
    availableLanguages = ["en", "de", "it", "fr", "es", "pt", "sk", "tr", "zh"];

    constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
        this.language = this.translateService.currentLang;
    }

    onChangeLanguage(language) {
        this.translateService.use(language);
    }
}
