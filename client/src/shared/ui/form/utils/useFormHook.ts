import React, { useState } from 'react';

interface UseFormHookProps<T> {
    initialValues: T;
}

interface UseFormHookResult<T> {
    values: T;

    // eslint-disable-next-line no-unused-vars
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function useFormHook<T>({
    initialValues,
}: UseFormHookProps<T>): UseFormHookResult<T> {
    const [values, setValues] = useState<T>(initialValues);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!(e.target.name in values)) {
            throw Object.assign(
                new Error(`[useFormHook] Input with name ${e.target.name} is not key of interface.`),
                { code: 402 },
            );
        }

        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return {
        onInputChange: handleInputChange,
        values,
    };
}
