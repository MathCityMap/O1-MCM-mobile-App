import {Pipe, PipeTransform} from "@angular/core";
import {Helper} from "../../classes/Helper";

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    public transform(value, keys: string, term: string) {
        const values = value || [];
        if (!term) {
            Helper.searchResults = values.length;
            return values;
        }

        const searchKeys = (keys || "")
            .split(",")
            .map((key) => key.trim())
            .filter((key) => key.length > 0);

        let regex: RegExp;
        try {
            regex = new RegExp(term, "i");
        } catch (e) {
            regex = new RegExp(this.escapeRegExp(term), "i");
        }

        let result = values.filter((item) =>
            searchKeys.some((key) => {
                if (!item || !Object.prototype.hasOwnProperty.call(item, key)) {
                    return false;
                }
                const fieldValue = item[key];
                if (fieldValue === null || fieldValue === undefined) {
                    return false;
                }
                return regex.test(String(fieldValue));
            }),
        );
        Helper.searchResults = result.length;
        console.log("searchResults", Helper.searchResults);
        return result;
    }

    private escapeRegExp(text: string): string {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
