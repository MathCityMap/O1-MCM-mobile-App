import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ApiConfiguration} from "../api-configuration";
import {BaseService} from "../base-service";
import {Helper} from "../../../classes/Helper";

export interface ImageUrlResponse {
    success: boolean,
    errorMsgs: Array<any>,
    responseData: {
        mediaCategory: string,
        smallUrl: string,
        mediumUrl: string,
        largeUrl: string,
        thumbUrl: string
    }
}

@Injectable()
export class ProblemReportService extends BaseService{

    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }
    public uploadImage(file: Blob, taskCode: string): Promise<ImageUrlResponse> {
        let headers = new HttpHeaders().append('Authorization', 'Basic bWF0aGNpdHltYXA6bWNtMjAxNg==');
        // headers = headers.append('Content-Type', 'multipart/form-data;')
        //     .append('Accept', 'application/json')

        let body = new FormData();
        body.append('file', file, `${taskCode}.jpg`);
        body.append('appKey', "mcm");
        body.append('filename', `${taskCode}.jpg`);
        body.append('mediaType', 'image');
        body.append('mediaCategory', 'pr');

        console.log('REQUEST BODY', body);
        console.log('REQUEST HEADER', headers);

        return this.http.post<ImageUrlResponse>(Helper.MEDIASERVER_BASE_URL + "/mcm/uploadImage", body, {headers: headers}).toPromise()
            .catch(err => {
                console.warn('ProblemReportService: uploadImage failed', err);
                return null;
            });
    }

    public sendReports(taskCode: string, problemType: string, text: string, imageUrl: string) {
        return this.http.post(this.rootUrl + "/problem-reports/tasks/new", {taskCode, problemType, text, imageUrl}).toPromise()
            .catch(err => {
                console.warn('sendReports failed', err);
                return null;
            });
    }

    public convertDataUriToBlob(dataURI) {
        try {
            let byteString = atob(dataURI.split(',')[1]);
            let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        } catch (e) {
            console.warn('convertDataUriToBlob: invalid data URI', e);
            return null;
        }
    }
}
