export interface TranslationTaskResponse {
    tasks: Array<ResponseTaskTranslation>
}

export interface ResponseTaskTranslation {
    id: number;
    language: string;
    taskId: number;
    title: string;
    description: string;
    solution?: string;
    hint1?: string;
    hint2?: string;
    hint3?: string;
    sample_solution: string;
}
