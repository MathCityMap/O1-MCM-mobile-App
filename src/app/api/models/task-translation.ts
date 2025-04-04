export interface TranslationTaskResponse {
    tasks: Array<TaskTranslation>
}

export interface TaskTranslation {
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
