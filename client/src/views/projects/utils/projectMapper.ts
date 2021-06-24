import { ProjectProps } from '../components/Project';

const projectMapper = (data: any[]): ProjectProps[] => data.map((item): ProjectProps => ({
    ID: item.id,
    name: item.name,
}));

export default projectMapper;
