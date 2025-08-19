import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'localizedDate',
    pure: false
})
export class LocalizedDatePipe implements PipeTransform {

    constructor(private translateService: TranslateService) {
    }

    transform(value: any, pattern: string = 'mediumDate'): any {
        const datePipe: DatePipe = new DatePipe(this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang);
        try {
            return datePipe.transform(value, pattern);
        } catch (e) {
            console.warn('Tried using datePipe with unknown locale', e);
            return datePipe.transform(value, pattern, undefined, "en");
        }
    }

}
