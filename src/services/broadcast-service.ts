import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class BroadcastService {
    public historyChanged$: EventEmitter<boolean>;
    public downloadProgress$: EventEmitter<any>

    constructor() {
        this.historyChanged$ = new EventEmitter();
        this.downloadProgress$ = new EventEmitter();
    }

    public historyChanged(canGoBack: boolean): void {
        this.historyChanged$.emit(canGoBack);
    }

    public downloadProgressChanged(total: number, doneDownload: number ): void {
        this.downloadProgress$.emit({total: total, done: doneDownload});
    }
}