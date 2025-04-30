import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConfiguration} from "../api-configuration";
import {TrailTranslation, TranslationTrailResponse} from "../models/trail-translation";
import {ResponseTaskTranslation, TranslationTaskResponse} from "../models/response-task-translation";
import {Storage} from "@ionic/storage";
import {TaskTranslation, TranslationStorage} from "../models/translation-storage";
import {LanguageService} from "../../../services/language-service";
import {API_REQUEST_PASS, API_REQUEST_USER} from "../../../env/env";

@Injectable()
export class TranslationService {
    private _translateLanguage = "en"
    translateStorageBaseKey = "MCMTranslations"
    private _isEnabled: boolean = false;

    public set isEnabled(value: boolean) {
        this.storage.set(`${this.translateStorageBaseKey}-isEnabled`, value);
        this._isEnabled = value;
    }

    public get isEnabled() {
        return this._isEnabled;
    }

    public set translateLanguage(lang: string) {
        if (lang.length !== 2) return;
        this.storage.set(`${this.translateStorageBaseKey}-language`, lang);
        this._translateLanguage = lang;
    }

    public get translateLanguage() {
        return this._translateLanguage;
    }

    constructor(private http: HttpClient, private apiConfig: ApiConfiguration, private storage: Storage, private languageService: LanguageService) {
    }

    async init() {
        let storedLanguage = await this.storage.get(`${this.translateStorageBaseKey}-language`);
        if (!storedLanguage) {
            storedLanguage = await this.languageService.getDeviceLanguage();
        }
        let activeSetting = await this.storage.get(`${this.translateStorageBaseKey}-isEnabled`);
        if (activeSetting) {
            this._isEnabled = activeSetting;
        }
        this.translateLanguage = storedLanguage;
    }

    async getTranslationForRoute(code: string, fetchIfNotAvailable = false): Promise<{translation: TrailTranslation, isFetched: boolean}> {
        const storageKey = `${this.translateStorageBaseKey}-${code}`
        let trailTranslation: TrailTranslation|undefined;
        let translations: TranslationStorage = await this.storage.get(storageKey);
        if (!translations || !translations[this.translateLanguage] || !translations[this.translateLanguage].trail) {
            if (fetchIfNotAvailable) {
                let translation = await this.fetchRouteTranslation(code);
                if (!translations) {
                    translations = {};
                }
                if (!translations[this.translateLanguage]) {
                    translations[this.translateLanguage] = {trailFetched: false, tasksFetched: false};
                }
                if (translation) {
                    trailTranslation = translation;
                    translations[this.translateLanguage].trail = translation;
                }
                translations[this.translateLanguage].trailFetched = true;
                await this.storage.set(storageKey, translations);
            }
        } else {
            trailTranslation = translations[this.translateLanguage].trail;
        }
        return {translation: trailTranslation, isFetched: translations && translations[this.translateLanguage] ? translations[this.translateLanguage].trailFetched : false};
    }

    async getTranslationForTask(taskId: number, routeCode: string, fetchIfNotAvailable = false): Promise<{ translation: TaskTranslation, isFetched: boolean}> {
        const storageKey = `${this.translateStorageBaseKey}-${routeCode}`
        let taskTranslations: TaskTranslation[] = [];
        let storedTranslations: TranslationStorage = await this.storage.get(storageKey);
        if (!storedTranslations || !storedTranslations[this.translateLanguage] || !storedTranslations[this.translateLanguage].tasks) {
            if (fetchIfNotAvailable) {
                let translations = await this.fetchTaskTranslationsForRoute(routeCode);
                if (!storedTranslations) {
                    storedTranslations = {};
                }
                if (!storedTranslations[this.translateLanguage]) {
                    storedTranslations[this.translateLanguage] = {trailFetched: false, tasksFetched: false};
                }
                if (translations) {
                    taskTranslations = translations.map(task => TaskTranslation.FromTranslationResponse(task));
                    storedTranslations[this.translateLanguage].tasks = taskTranslations;
                }
                storedTranslations[this.translateLanguage].tasksFetched = true;
                await this.storage.set(storageKey, storedTranslations)
            }
        } else {
            taskTranslations = storedTranslations[this.translateLanguage].tasks.map(rawTask => new TaskTranslation(rawTask));
        }
        return {translation: taskTranslations.find(translation => translation.taskId === taskId), isFetched: storedTranslations && storedTranslations[this.translateLanguage] ? storedTranslations[this.translateLanguage].tasksFetched : false};
    }

    // TODO handle empty response?
    async fetchRouteTranslation(code: string): Promise<TrailTranslation|null> {
        try {
            const response = await this.http.get<TranslationTrailResponse>(`${this.apiConfig.rootUrl}/app/v1/translation/trail/by-code/${code}/${this.translateLanguage}`, {headers: this.getRequestHeaders()}).toPromise();
            if (response.error) {
                console.error('trail translation could not be fetched response code: ', response.response_code)
            }
            return response.trail;
        } catch (e) {
            console.warn("error fetching task translation", e);
            return null;
        }
    }

    // TODO handle empty response?
    async fetchTaskTranslationsForRoute(code: string): Promise<Array<ResponseTaskTranslation>> {
        try {
            const response = await this.http.get<TranslationTaskResponse>(`${this.apiConfig.rootUrl}/app/v1/translation/trail/by-code/${code}/${this.translateLanguage}/tasks`, {headers: this.getRequestHeaders()}).toPromise();
            if (response.error) {
                console.error('task translation could not be fetched response code: ', response.response_code)
            }
            return response.tasks;
        } catch (e) {
            console.warn("error fetching task translation", e);
            return [];
        }
    }

    private getRequestHeaders() {
        return new HttpHeaders({
            "Authorization": "Basic " + btoa(`${API_REQUEST_USER}:${API_REQUEST_PASS}`)
        });
    }

    async removeTaskTranslations(routeCode: string) {
        const storageKey = `${this.translateStorageBaseKey}-${routeCode}`;
        let storedTranslations: TranslationStorage = await this.storage.get(storageKey);
        for (let language in storedTranslations) {
            storedTranslations[language].tasksFetched = false;
            storedTranslations[language].tasks = undefined;
        }
        return this.storage.set(storageKey, storedTranslations);
    }

    async removeTranslations(routeCode: string) {
        const storageKey = `${this.translateStorageBaseKey}-${routeCode}`;
        return this.storage.remove(storageKey);
    }
}


