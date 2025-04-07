import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiConfiguration} from "../api-configuration";
import {TrailTranslation, TranslationTrailResponse} from "../models/trail-translation";
import {TaskTranslation, TranslationTaskResponse} from "../models/task-translation";
import {Storage} from "@ionic/storage";
import {TranslationStorage} from "../models/translation-storage";

//TODO Add feedback element to translationStorage entries to signal if and when translations (task and trail separately) have been fetched in language
@Injectable()
export class TranslationService {
    // TODO make this configurable through settings page
    translateLanguage = "de"
    translateStorageBaseKey = "MCMTranslations"

    constructor(private http: HttpClient, private apiConfig: ApiConfiguration, private storage: Storage) {
    }

    async getTranslationForRoute(code: string, fetchIfNotAvailable = false) {
        const storageKey = `${this.translateStorageBaseKey}-${code}`
        let trailTranslation: TrailTranslation|undefined;
        let translations: TranslationStorage = await this.storage.get(storageKey);
        if (!translations || !translations[this.translateLanguage] || !translations[this.translateLanguage].trail) {
            if (fetchIfNotAvailable) {
                let translation = await this.fetchRouteTranslation(code);
                if (translation) {
                    trailTranslation = translation;
                    if (!translations) {
                        translations = {};
                    }
                    if (!translations[this.translateLanguage]) {
                        translations[this.translateLanguage] = {};
                    }
                    translations[this.translateLanguage].trail = trailTranslation;
                    await this.storage.set(storageKey, translations);
                }
            }
        } else {
            trailTranslation = translations[this.translateLanguage].trail;
        }
        return trailTranslation;
    }

    async getTranslationForTask(taskId: number, routeCode: string, fetchIfNotAvailable = false): Promise<TaskTranslation|undefined> {
        const storageKey = `${this.translateStorageBaseKey}-${routeCode}`
        let taskTranslations: TaskTranslation[] = [];
        let storedTranslations: TranslationStorage = await this.storage.get(storageKey);
        if (!storedTranslations || !storedTranslations[this.translateLanguage] || !storedTranslations[this.translateLanguage].tasks) {
            if (fetchIfNotAvailable) {
                let translations = await this.fetchTaskTranslationsForRoute(routeCode);
                if (translations) {
                    taskTranslations = translations;
                    if (!storedTranslations) {
                        storedTranslations = {};
                    }
                    if (!storedTranslations[this.translateLanguage]) {
                        storedTranslations[this.translateLanguage] = {};
                    }
                    storedTranslations[this.translateLanguage].tasks = taskTranslations;
                    await this.storage.set(storageKey, storedTranslations)
                }
            }
        } else {
            taskTranslations = storedTranslations[this.translateLanguage].tasks;
        }
        return taskTranslations.find(translation => translation.taskId === taskId);
    }

    // TODO handle empty response?
    async fetchRouteTranslation(code: string) {
        const response = await this.http.get<TranslationTrailResponse>(`${this.apiConfig.rootUrl}/translation/trail/by-code/${code}/${this.translateLanguage}`).toPromise();
        console.log(response.trail);
        return response.trail;
    }

    // TODO handle empty response?
    async fetchTaskTranslationsForRoute(code: string) {
        const response = await this.http.get<TranslationTaskResponse>(`${this.apiConfig.rootUrl}/translation/tasks/by-trail-code/${code}/${this.translateLanguage}`).toPromise();
        console.log(response.tasks);
        return response.tasks;
    }
}


