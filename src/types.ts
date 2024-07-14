export interface Task {
    id: string;
    title: string;
    status: boolean;
}

export type ApiTask = Omit<Task, 'id'>;

export interface ApiTasks{
    [id:string]: ApiTask;
}