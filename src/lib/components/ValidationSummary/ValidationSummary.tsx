import type React from 'react';

import { usePasswordContext } from '@/lib/hooks';

import ErrorMessages from '../ErrorMessage';

type ValidationSummaryProps = {
    className?: string;
    successClassName?: string;
    errorClassName?: string;
    successMessage?: string;
};

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
    className = '',
    successClassName = 'bg-green-100 text-green-800',
    errorClassName = 'bg-red-100 text-red-800',
    successMessage = 'Password is valid!',
}) => {
    const { validation, submitted } = usePasswordContext();

    if (!submitted) return null;

    return (
        <div className={`mt-4 rounded-md p-3 ${validation.isValid ? successClassName : errorClassName} ${className}`}>
            {validation.isValid ? successMessage : <ErrorMessages errors={Object.values(validation.errors)} />}
        </div>
    );
};

export default ValidationSummary;
