export interface IProjectValues {
    name: string;
}

export interface IProject extends IProjectValues {
    ID: string;
}

const projectMapper = (data: any[]): IProject[] => data.map((item): IProject => ({
    ID: item.id,
    name: item.name,
}));

export default projectMapper;
