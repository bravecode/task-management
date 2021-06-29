import React, { useMemo } from 'react';
import {
    Modal, PrimaryButton, Stack, TextField as Input,
} from '@fluentui/react';
import classes from './CreateTask.module.css';

import useform from '../../../utils/hooks/useForm';
import APIService from '../../../utils/services/apiService';
import { IProjectTaskValues } from '../utils/tasksMapper';

interface CreateTaskProps {
    projectID: string;
    onModalClose: () => void;
    onProjectsRefetch: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
    projectID,
    onProjectsRefetch,
    onModalClose,
}) => {
    const apiService = useMemo(() => new APIService({
        onSuccess: () => {
            onModalClose();
            onProjectsRefetch();
        },
    }), []);

    // Form
    const { onInputChange, values } = useform<IProjectTaskValues>({
        initialValues: {
            title: '',
            description: '',
        },
    });

    // Handlers
    const handleSubmit = () => {
        apiService.post('/tasks', JSON.stringify({
            ...values,
            project_id: parseFloat(projectID),
            category: 'to_do',
        }));
    };

    return (
        <Modal isOpen onDismiss={onModalClose}>
            <Stack tokens={{ childrenGap: 10 }} className={classes.container}>
                <Input
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={onInputChange}
                    required
                />

                <Input
                    label="Description"
                    name="description"
                    value={values.description}
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

export default CreateTask;
