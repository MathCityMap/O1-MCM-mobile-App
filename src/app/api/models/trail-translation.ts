export interface TranslationTrailResponse {
    trail: TrailTranslation
}

export interface TrailTranslation {
    id: number,
    language: string,
    trailId: number,
    title: string,
    description: string
}
