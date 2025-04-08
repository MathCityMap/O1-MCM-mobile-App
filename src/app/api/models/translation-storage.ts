import {TrailTranslation} from "./trail-translation";
import {TaskTranslation} from "./task-translation";

export interface TranslationStorage {
    [langCode: string]: TranslationStorageEntry;
}

export interface TranslationStorageEntry{
    trail?: TrailTranslation;
    tasks?: Array<TaskTranslation>;
    trailFetched: boolean;
    tasksFetched: boolean;
}
