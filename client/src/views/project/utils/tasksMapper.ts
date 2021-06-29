export interface IProjectTask {
    ID: string;
    title: string;
    description: string;
    author: string;
}

export interface IProjectTaskValues {
    title: string;
    description: string;
}

export interface IProjectBoards {
    'to_do': IProjectTask[];
    'in_progress': IProjectTask[];
    'done': IProjectTask[];
}

export const prepareTask = (data: any): IProjectTask => ({
    ID: `${data.id}`,
    title: data.title,
    description: data.description,
    author: 'John Doe',
});

export const prepareBoards = (data: any[]): IProjectBoards => ({
    to_do: data.filter((item) => item.category === 'to_do').map(prepareTask),
    in_progress: data.filter((item) => item.category === 'in_progress').map(prepareTask),
    done: data.filter((item) => item.category === 'done').map(prepareTask),
});
