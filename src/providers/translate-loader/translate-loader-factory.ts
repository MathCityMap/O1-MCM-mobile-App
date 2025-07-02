import {HttpClient} from '@angular/common/http';
import {McmTranslateLoader} from "./mcmTranslateLoader";
import {Storage} from "@ionic/storage";


export function createTranslateLoader(httpClient: HttpClient, storage: Storage) {
    return new McmTranslateLoader(httpClient, storage)
}

