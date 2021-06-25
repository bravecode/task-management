import React from 'react';
import {
    Modal, PrimaryButton, Stack, TextField as Input,
} from '@fluentui/react';
import classes from './CreateProject.module.css';

import useform from '../../../utils/hooks/useForm';
import APIService from '../../../utils/services/apiService';

interface CreateProjectProps {
    open?: boolean;
    onModalClose: () => void;
    onProjectsRefetch: () => void;
}

interface Project {
    name: string;
}

const CreateProject: React.FC<CreateProjectProps> = ({
    open,
    onProjectsRefetch,
    onModalClose,
}) => {
    const apiService = new APIService({
        onSuccess: () => {
            onModalClose();
            onProjectsRefetch();
        },
    });

    // Form
    const { onInputChange, values } = useform<Project>({
        initialValues: {
            name: '',
        },
    });

    // Handlers
    const handleSubmit = () => {
        apiService.post('/projects', JSON.stringify(values));
    };

    return (
        <Modal isOpen={open} onDismiss={onModalClose}>
            <Stack tokens={{ childrenGap: 10 }} className={classes.container}>
                <Input
                    label="PROJECT NAME"
                    name="name"
                    value={values.name}
                    onChange={onInputChange}
                    required
                />

                <PrimaryButton
                    text="Create"
                    type="button"
                    onClick={handleSubmit}
                />
            </Stack>
        </Modal>
    );
};

export default CreateProject;
