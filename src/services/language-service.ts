import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';
import { checkAvailability } from '@ionic-native/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LanguageService {
    private isInitialized = false;
    private initializeListeners = [];

    private static STORAGE_KEY = 'LanguageService.lang';
    private availableLanguages = ["en", "de", "it", "fr", "es", "pt", "sk", "tr", "zh", "el"];

    constructor(private translateService: TranslateService, private platform: Platform,
                private globalization: Globalization, private storage: Storage) {
    }

    getAvailableLanguages(): string[] {
        return this.availableLanguages;
    }

    async initialize() {
        if (this.isInitialized) {
            return Promise.resolve();
        }
        if (this.initializeListeners.length > 0) {
            // a parallel call has already been started
            return new Promise(success => {
                this.initializeListeners.push(success);
            });
        }
        return new Promise(async success => {
            this.initializeListeners.push(success);
            await this.platform.ready();
            let defaultLang = 'en';
            this.translateService.setDefaultLang(defaultLang);
            let lang = await this.storage.get(LanguageService.STORAGE_KEY);
            if (!lang && checkAvailability(Globalization.getPluginRef(), null, Globalization.getPluginName()) === true) {
                // no previous language found -> get device language
                try {
                    let preferredLanguage = await this.globalization.getPreferredLanguage();
                    if (preferredLanguage && preferredLanguage.value) {
                        lang = preferredLanguage.value;
                        if (lang.indexOf('-') > -1) {
                            lang = lang.split('-')[0];
                        }
                        if (lang.indexOf('_') > -1) {
                            lang = lang.split('_')[0];
                        }
                        lang = lang.toLowerCase();
                        if (this.availableLanguages.indexOf(lang) == -1) {
                            // detected language is not available
                            lang = null;
                        }
                    }
                } catch (e) {
                }
            }
            if (!lang) {
                lang = defaultLang;
            }
            await this.translateService.use(lang);

            setTimeout(() => {
                // use timeout to let language switch propagate
                this.isInitialized = true;
                this.initializeListeners.map(success => {
                    success();
                });
                this.initializeListeners = null;
            }, 100);
        });
    }

    async getLanguage(): Promise<string> {
        return this.translateService.currentLang;
    }

    async setLanguage(lang: string) {
        this.translateService.use(lang);
        await this.storage.set(LanguageService.STORAGE_KEY, lang);
    }
}