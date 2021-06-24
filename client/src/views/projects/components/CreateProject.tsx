import React from 'react';

import useFormHook from '../../../shared/ui/form/utils/useFormHook';
import FormGroup from '../../../shared/ui/form/group/FormGroup';
import FormInput from '../../../shared/ui/form/input/FormInput';
import FormLabel from '../../../shared/ui/form/label/FormLabel';
import Button from '../../../shared/ui/button/Button';
import APIService from '../../../utils/services/apiService';

interface CreateProjectProps {
    onCreate: () => void;
}

interface Project {
    name: string;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onCreate }) => {
    const apiService = new APIService({
        onSuccess: () => {
            onCreate();
        },
    });

    // Form
    const { onInputChange, values } = useFormHook<Project>({
        initialValues: {
            name: '',
        },
    });

    // Handlers
    const handleSubmit = () => {
        apiService.post('/projects', JSON.stringify(values));
    };

    return (
        <div>
            <FormGroup>
                <FormLabel label="Project Name" htmlFor="name" />
                <FormInput name="name" onChange={onInputChange} value={values.name} />
            </FormGroup>
            <FormGroup>
                <Button onClick={handleSubmit}>
                    Create
                </Button>
            </FormGroup>
        </div>
    );
};

export default CreateProject;
