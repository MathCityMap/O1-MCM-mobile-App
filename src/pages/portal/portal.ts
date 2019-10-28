import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

/**
 * Generated class for the PortalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-portal',
    templateUrl: 'portal.html',
})
export class PortalPage {

    languageUrl = {
        de: 'portal',
        en: 'portal-en',
        es: 'portal-es',
        pt: 'portal-pt',
        fr: 'portail',
        it: 'portale',
        sk: 'portal-sk',
        id: 'portal-id',
        tr: 'portal-tr',
        el: 'πύλη',
        zh: '入口'
    };
    currentLang:string;
    sanitizedUrl: SafeResourceUrl;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public iab: InAppBrowser, private translateService: TranslateService,
                private sanitizer: DomSanitizer) {
    }
    ionViewWillEnter(){
        this.currentLang = this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://codepen.io/sensei/pen/VwwaYxa?editors=1010");// + this.languageUrl[this.currentLang]);
    }
}
