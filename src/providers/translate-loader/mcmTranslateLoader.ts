import {TranslateLoader} from "@ngx-translate/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Helper} from "../../classes/Helper";
import {API_URL} from "../../env/env";
import {catchError} from "rxjs/operators";

const TRANSLATION_BASE_KEY = "MCM_TRANSLATION_STRINGS_"
export const TRANSLATION_CACHE_BASE = "MCM_TRANSLATION_UPDATE_"

export class McmTranslateLoader implements TranslateLoader {

    cachePersistDuration = 1209600000; // Cache persist duration in milliseconds

    constructor(private httpClient: HttpClient, private storage: Storage) {
    }
    getTranslation(lang: string): Observable<any> {
        return this.fetchTranslationFromServer(lang);
    }

    fetchTranslationFromServer(lang: string): Observable<any> {
        return new Observable((subscriber) => {
            let cacheKey = TRANSLATION_CACHE_BASE+lang;
            this.storage.get(cacheKey).then(timestamp => {
                if (Date.now() - timestamp < this.cachePersistDuration) {
                    return this.fetchTranslationFromCache(lang).subscribe({
                        next: (val) => subscriber.next(val),
                        error: (err) => subscriber.error(err),
                        complete: () => subscriber.complete()
                    });
                }
                this.httpClient.get(`${API_URL}/app/v1/translations/get-json-translation/${lang}`, {headers: Helper.getApiRequestHeaders()}).pipe(
                    catchError(_err => {
                        // return method to load from cache here
                        return this.fetchTranslationFromCache(lang)
                    })
                ).subscribe({
                    next: (val) => {
                        const key = TRANSLATION_BASE_KEY+lang
                        this.storage.set(key, val);
                        timestamp = Date.now();
                        this.storage.set(cacheKey, timestamp);
                        subscriber.next(val)
                    },
                    error: (err) => subscriber.error(err),  // Should not be reached due to catchError
                    complete: () => subscriber.complete()
                })
            });
        })
    }

    fetchTranslationFromCache(lang: string): Observable<any> {
        return new Observable(subscriber => {
           const key = TRANSLATION_BASE_KEY+lang
           this.storage.get(key).then( (result) => {
               if (result) {
                   subscriber.next(result);
                   subscriber.complete();
                   return;
               }
               // nothing in cache use local translation as fallback
               this.fetchLocalTranslation(lang).subscribe({
                   next: (val) => subscriber.next(val),
                   error: (err) => subscriber.error(err),
                   complete: () => subscriber.complete()
                   }
               )
           }); 
        });
    }

    fetchLocalTranslation(lang: string): Observable<any> {
        return this.httpClient.get(`./assets/localization/${lang}.json`);
    }
}
