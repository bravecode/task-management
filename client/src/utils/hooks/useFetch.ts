import { useEffect, useState } from 'react';
import AuthService from '../services/authService';

interface UseFetchProps<T> {
    url: string;
    // eslint-disable-next-line no-undef
    options: RequestInit;
    includeToken?: boolean;
    // eslint-disable-next-line no-unused-vars
    mapper?: (data: any) => T;
}

interface UseFetchResponse<T> {
    loading: boolean;
    data?: T;
    error?: string;
}

function useFetch<T>(props: UseFetchProps<T>): UseFetchResponse<T> {
    const authService = new AuthService({});

    // State
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();

    // Handlers
    const handleFetch = () => {
        setLoading(true);

        // Generate Headers
        const headers = new Headers(props.options.headers);
        const token = authService.getToken();

        if (props.includeToken && token) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        fetch(props.url, { ...props.options, headers })
            .then((res) => res.json())
            .then((res) => {
                if (res.detail) {
                    // Handle Error
                    setError(res.detail);
                } else {
                    setData(props.mapper ? props.mapper(res) : res);
                }
            })
            .catch(() => {
                setError('Network Error. Try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Fetch Data
    useEffect(() => {
        handleFetch();
    }, []);

    return {
        loading,
        error,
        data,
    };
}

export default useFetch;
