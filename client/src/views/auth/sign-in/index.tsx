import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    MessageBar, MessageBarType, Stack, Text,
} from '@fluentui/react';
import classes from './index.module.css';

import Form from './components/Form';
import AuthService, { LoginValues } from '../../../utils/services/authService';

const Page: React.FC = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    // Handlers
    const handleSuccess = () => {
        history.push('/');
    };

    const handleFail = (value: string) => {
        setError(value);
    };

    const handleErrorClose = () => {
        setError('');
    };

    // State
    const authService = new AuthService({
        onSuccess: handleSuccess,
        onFail: handleFail,
    });

    const handleSubmit = (values: LoginValues) => {
        authService.login(values);
    };

    return (
        <div className={classes.page}>

            <Stack className={classes.form} tokens={{ childrenGap: 20 }}>
                <Stack.Item>
                    <Stack as="header" tokens={{ childrenGap: 5 }}>
                        <Text variant="xLarge" block>
                            SIGN IN
                        </Text>
                        <Text variant="medium" block>
                            Access your account.
                        </Text>
                    </Stack>
                </Stack.Item>
                <Stack.Item>
                    {
                        error && (
                            <MessageBar
                                messageBarType={MessageBarType.error}
                                onDismiss={handleErrorClose}
                            >
                                { error }
                            </MessageBar>
                        )
                    }
                </Stack.Item>
                <Stack.Item>
                    <Form onSubmit={handleSubmit} />
                </Stack.Item>
            </Stack>
        </div>
    );
};

export default Page;
