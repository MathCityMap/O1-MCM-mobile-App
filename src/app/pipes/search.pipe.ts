import {Pipe, PipeTransform} from "@angular/core";
import {Helper} from "../../classes/Helper";

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    public transform(value, keys: string, term: string) {
        if (!term) return value;
        let result = (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
        Helper.searchResults = result.length;
        console.log("searchResults", Helper.searchResults);
        return result;
    }
}