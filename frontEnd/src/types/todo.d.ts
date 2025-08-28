export enum TodoType {
    RECENT = 'RECENT',
    LONG_TERM = 'LONG_TERM',
    STUDY_PLAN = 'STUDY_PLAN',
}

export interface Todo {
    id: string;
    content: string;
    completed: boolean;
    type: TodoType;
    createdAt: string;
    updatedAt: string;
}
