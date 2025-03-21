import type React from 'react';

import { usePasswordContext } from '@/lib/context/FormContext';

type SubmitButtonProps = {
    text?: string;
    className?: string;
    disableWhenInvalid?: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    text = 'Submit',
    className = '',
    disableWhenInvalid = false,
}) => {
    const { handleSubmit, validation } = usePasswordContext();

    return (
        <button
            type="submit"
            disabled={disableWhenInvalid && !validation.isValid}
            onClick={handleSubmit}
            className={`w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                disableWhenInvalid && !validation.isValid ? 'cursor-not-allowed opacity-50' : ''
            } ${className}`}
        >
            {text}
        </button>
    );
};

export default SubmitButton;
