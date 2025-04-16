export interface TranslationTrailResponse {
    trail: TrailTranslation;
    error?: boolean;
    response_code?: number;
}

export interface TrailTranslation {
    id: number,
    language: string,
    trailId: number,
    title: string,
    description: string
}
