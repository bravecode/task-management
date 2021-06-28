import React, { useMemo } from 'react';
import {
    Modal, PrimaryButton, Stack, TextField as Input,
} from '@fluentui/react';
import classes from './CreateProject.module.css';

import useform from '../../../utils/hooks/useForm';
import APIService from '../../../utils/services/apiService';
import { IProject } from '../utils/projectMapper';

interface EditProjectProps {
    initialValues: IProject;
    onModalClose: () => void;
    onProjectsRefetch: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({
    initialValues,
    onProjectsRefetch,
    onModalClose,
}) => {
    const apiService = useMemo(() => new APIService({
        onSuccess: () => {
            onModalClose();
            onProjectsRefetch();
        },
    }), [initialValues]);

    // Form
    const { onInputChange, values } = useform<IProject>({ initialValues });

    // Handlers
    const handleSubmit = () => {
        apiService.put(`/projects/${initialValues.ID}`, JSON.stringify(values));
    };

    return (
        <Modal isOpen onDismiss={onModalClose}>
            <Stack tokens={{ childrenGap: 10 }} className={classes.container}>
                <Input
                    label="PROJECT NAME"
                    name="name"
                    value={values.name}
                    onChange={onInputChange}
                    required
                />

                <PrimaryButton
                    text="Edit Project"
                    type="button"
                    onClick={handleSubmit}
                />
            </Stack>
        </Modal>
    );
};

export default EditProject;
