import {TranslateLoader} from "@ngx-translate/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Helper} from "../../classes/Helper";
import {API_URL} from "../../env/env";
import {catchError} from "rxjs/operators";

const TRANSLATION_BASE_KEY = "MCM_TRANSLATION_STRINGS_"

export class McmTranslateLoader implements TranslateLoader {

    constructor(private httpClient: HttpClient, private storage: Storage) {
    }
    getTranslation(lang: string): Observable<any> {
        return this.fetchTranslationFromServer(lang);
    }

    fetchTranslationFromServer(lang: string): Observable<any> {
        return new Observable((subscriber) => {
            this.httpClient.get(`${API_URL}/app/v1/translations/get-json-translation/${lang}`, {headers: Helper.getApiRequestHeaders()}).pipe(
                catchError(err => {
                    // return method to load from cache here
                    console.debug('No response from server trying cache');
                    return this.fetchTranslationFromCache(lang)
                })
            ).subscribe({
                next: (val) => {
                    const key = TRANSLATION_BASE_KEY+lang
                    this.storage.set(key, val);
                    subscriber.next(val)
                },
                error: (err) => subscriber.error(err),  // Should not be reached due to catchError
                complete: () => subscriber.complete()
            })
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
               console.debug('Nothing in cache fetching from assets');
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
