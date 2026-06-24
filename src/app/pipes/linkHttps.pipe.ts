import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linkHttps'
})
/**
 * Adds 'https://' in front of url if missing or transforms 'http://' to 'https://
*/
export class LinkHttpsPipe implements PipeTransform {
    transform(url: string): string {
        if (!url || url.match(/^\s*(javascript|data|vbscript)\s*:/i)) {
            return '';
        }
        url = url.replace('http://','https://');
        return url.startsWith("https://") ? url : "https://" + url;
    }
}
