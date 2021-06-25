import React, { useState } from 'react';

interface UseFormHookProps<T> {
    initialValues: T;
}

interface UseFormHookResult<T> {
    values: T;

    // eslint-disable-next-line no-unused-vars
    onInputChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function useForm<T>({
    initialValues,
}: UseFormHookProps<T>): UseFormHookResult<T> {
    const [values, setValues] = useState<T>(initialValues);

    // Handlers
    const handleInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;

        if (!(name in values)) {
            throw Object.assign(
                new Error(`[useFormHook] Input with name ${name} is not key of interface.`),
                { code: 402 },
            );
        }

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        onInputChange: handleInputChange,
        values,
    };
}

export default useForm;
