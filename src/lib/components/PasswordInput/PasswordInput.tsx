import type React from 'react';

import { usePasswordContext } from '@/lib/context/FormContext';

import ErrorMessages from '../ErrorMessage';

type PasswordInputProps = {
    id?: string;
    label?: string;
    placeholder?: string;
    showErrors?: boolean;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
    id = 'password',
    label = 'Password',
    placeholder = 'Enter password',
    showErrors = true,
    className = '',
    inputClassName = '',
    labelClassName = '',
    errorClassName = '',
}) => {
    const { password, setPassword, validation, touched, handleBlur } = usePasswordContext();

    const hasError =
        touched.password &&
        Object.keys(validation.errors).some(
            key => key !== 'match' && Boolean(validation.errors[key as keyof typeof validation.errors])
        );

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className={`mb-1 block text-sm font-medium text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                type="password"
                id={id}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                className={`w-full border px-3 py-2 ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
                placeholder={placeholder}
            />
            {showErrors && touched.password && (
                <ErrorMessages
                    errors={Object.values(validation.errors).filter(
                        (_, index) => Object.keys(validation.errors)[index] !== 'match'
                    )}
                    className={errorClassName}
                />
            )}
        </div>
    );
};

export default PasswordInput;
