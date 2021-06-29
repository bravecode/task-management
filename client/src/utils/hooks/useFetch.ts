import { useEffect, useMemo, useState } from 'react';

import APIService from '../services/apiService';

interface UseFetchProps<T> {
    url: string;
    // eslint-disable-next-line no-undef
    options?: RequestInit;
    includeToken?: boolean;
    // eslint-disable-next-line no-unused-vars
    mapper?: (data: any) => T;
}

interface UseFetchResponse<T> {
    loading: boolean;
    refetch: () => void;
    data?: T;
    error?: string;
}

function useFetch<T>(props: UseFetchProps<T>): UseFetchResponse<T> {
    // State
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>();

    // API Service
    const apiService = useMemo(() => new APIService({
        useTokenHeader: props.includeToken,
        onDone: () => {
            setLoading(false);
        },
        onFail: (err) => {
            setError(err);
        },
        onSuccess: (res) => {
            setData(props.mapper ? props.mapper(res) : res);
        },
    }), [props]);

    // Handlers
    const handleFetch = async () => {
        setLoading(true);

        await apiService.get(props.url, props.options);

        setLoading(false);
    };

    // Fetch Data
    useEffect(() => {
        handleFetch();
    }, []);

    return {
        loading,
        error,
        data,
        refetch: handleFetch,
    };
}

export default useFetch;
