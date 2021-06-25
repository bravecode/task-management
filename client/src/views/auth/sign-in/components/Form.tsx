import React from 'react';
import { Link } from 'react-router-dom';
import {
    PrimaryButton, Stack, IStackTokens, TextField as Input, Link as Anchor,
} from '@fluentui/react';

import useForm from '../../../../utils/hooks/useForm';
import { LoginValues } from '../../../../utils/services/authService';

interface FormProps {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (values: LoginValues) => void;
}

// Styles
const stackStyles: IStackTokens = {
    childrenGap: 10,
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const { onInputChange, values } = useForm<LoginValues>({
        initialValues: {
            email: '',
            password: '',
        },
    });

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack tokens={stackStyles}>
                <Input
                    label="E-MAIL"
                    name="email"
                    value={values.email}
                    onChange={onInputChange}
                    required
                />

                <Input
                    label="PASSWORD"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onInputChange}
                    required
                />

                <Anchor as={Link} to="/auth/sign-up">
                    Don&apos;t have an account? Create new.
                </Anchor>

                <PrimaryButton
                    text="SIGN IN"
                    type="submt"
                />
            </Stack>
        </form>
    );
};

export default Form;
