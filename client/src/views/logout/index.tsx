import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../services/authService';

const Logout: React.FC = () => {
    const authService = new AuthService({});

    useEffect(() => {
        authService.logout();
    }, []);

    return <Redirect to="/auth/sign-in" />;
};

export default Logout;
