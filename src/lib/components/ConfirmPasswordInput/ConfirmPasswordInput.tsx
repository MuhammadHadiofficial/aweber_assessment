import type React from 'react';

import { usePasswordContext } from '@/lib/context/FormContext';

// Confirm Password Input Field
export type ConfirmPasswordInputProps = {
    id?: string;
    label?: string;
    placeholder?: string;
    showErrors?: boolean;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
};

export const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
    id = 'confirmPassword',
    label = 'Confirm Password',
    placeholder = 'Confirm password',
    showErrors = true,
    className = '',
    inputClassName = '',
    labelClassName = '',
    errorClassName = '',
}) => {
    const { confirmPassword, setConfirmPassword, validation, touched, handleBlur } = usePasswordContext();

    const hasError = touched.confirmPassword && validation.errors.match;

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
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={`w-full border px-3 py-2 ${hasError ? 'border-red-500' : 'border-gray-300'} 
          rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
                placeholder={placeholder}
            />

            {showErrors && touched.confirmPassword && validation.errors.match && (
                <div className={`mt-1 text-sm text-red-600 ${errorClassName}`}>{validation.errors.match}</div>
            )}
        </div>
    );
};

export default ConfirmPasswordInput;
