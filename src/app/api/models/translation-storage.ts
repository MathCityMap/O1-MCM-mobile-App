import {TrailTranslation} from "./trail-translation";
import {ResponseTaskTranslation} from "./response-task-translation";
import {Helper} from "../../../classes/Helper";
import {Hint} from "../../../entity/Task";

export interface TranslationStorage {
    [langCode: string]: TranslationStorageEntry;
}

export interface TranslationStorageEntry{
    trail?: TrailTranslation;
    tasks?: Array<TaskTranslation>;
    trailFetched: boolean;
    tasksFetched: boolean;
}

export class TaskTranslation {
    id: number;
    language: string;
    taskId: number;
    title: string;
    description: string;
    solution?: Array<any>;
    hint1?: Array<string>;
    hint2?: Array<string>;
    hint3?: Array<string>;
    sample_solution: string;

    constructor(init?: Partial<TaskTranslation>) {
        Object.assign(this, init);
    }

    static FromTranslationResponse(response: ResponseTaskTranslation) {
        let task = new TaskTranslation();
        task.id = response.id;
        task.language = response.language;
        task.taskId = response.taskId;
        task.title = response.title;
        task.description = response.description;
        if (response.solution) {
            task.solution = this.safeExtractJson(response.solution);
        }
        if (response.hint1) {
            task.hint1 = this.safeExtractJson(response.hint1);
        }
        if (response.hint2) {
            task.hint2 = this.safeExtractJson(response.hint2);
        }
        if (response.hint3) {
            task.hint3 = this.safeExtractJson(response.hint3);
        }
        task.sample_solution = this.safeExtractJson(response.sample_solution);
        return task;
    }

    getSolutionOptionList(solutionType: string, originalSolution: any): Array<any> {
        if (solutionType == 'multiple_choice') {
            let multipleChoiceSolutionList = [];
            let temp = this.solution;

            if (!temp) {
                return originalSolution;
            }

            temp[0].forEach(element => {
                multipleChoiceSolutionList.push({userChecked: false, rightAnswer: false, value: element});
            });
            temp[1].forEach(element => {
                multipleChoiceSolutionList[element].rightAnswer = true;
            });
            console.log(multipleChoiceSolutionList);
            return multipleChoiceSolutionList;
        } else {
            return this.solution;
        }
    }

    getSolution(originalSolution: any) {
        return this.solution ?? originalSolution;
    }

    getHint(index: number) {
        let hint = this.getHintObject(index);
        if (hint) {
            return hint;
        }
        return null;
    }

    getHintObject(index: number): Hint {
        let hint: string[];
        switch (index) {
            case 1:
                hint = this.hint1;
                break;
            case 2:
                hint = this.hint2;
                break;
            case 3:
                hint = this.hint3;
                break;
        }
        if (hint.length >= 2) {
            return {
                type: hint[0],
                value: hint[1],
                index: index
            }
        }
        return null;
    }

    getSolutionSample(): string {
        if (this.sample_solution) {
            if (this.sample_solution.length > 0) {
                return this.sample_solution[0];
            }
        }
        return "";
    }

    private static safeExtractJson(str) {
        const startObj = str.indexOf('{');
        const startArr = str.indexOf('[');

        // Determine which comes first: { or [
        const start = (startObj === -1) ? startArr :
            (startArr === -1) ? startObj : Math.min(startObj, startArr);

        if (start === -1) return null;

        const openChar = str[start];
        const closeChar = openChar === '{' ? '}' : ']';

        let count = 0;
        for (let i = start; i < str.length; i++) {
            if (str[i] === openChar) count++;
            else if (str[i] === closeChar) count--;

            if (count === 0) {
                const jsonStr = str.slice(start, i + 1);
                try {
                    return Helper.safeJsonDecode(jsonStr);
                } catch (e) {
                    return null;
                }
            }
        }

        return null; // No balanced closing character found
    }
}
