import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class BroadcastService {
    public historyChanged$: EventEmitter<boolean>;


    constructor() {
        this.historyChanged$ = new EventEmitter();
    }

    public historyChanged(canGoBack: boolean): void {
        this.historyChanged$.emit(canGoBack);
    }
}