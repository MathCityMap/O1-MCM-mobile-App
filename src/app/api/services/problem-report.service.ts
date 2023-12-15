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

        return this.http.post<ImageUrlResponse>(Helper.MEDIASERVER_BASE_URL + "/mcm/uploadImage", body, {headers: headers}).toPromise();
    }

    public sendReports(taskCode: string, problemType: string, text: string, imageUrl: string) {
        return this.http.post(this.rootUrl + "/problem-reports/tasks/new", {taskCode, problemType, text, imageUrl}).toPromise();
    }

    public convertDataUriToBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        let ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], {type: mimeString});
    }
}
