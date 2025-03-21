import type React from 'react';
import type { ReactNode } from 'react';

import { PasswordRequirements, SubmitButton, ValidationSummary } from '@/lib/components';
import { PasswordProvider } from '@/lib/context/FormContext';

import ConfirmPasswordInput from '../ConfirmPasswordInput';
import PasswordInput from '../PasswordInput/PasswordInput';

export type PasswordFormProps = {
    onSubmit: (password: string) => void;
    rules?: Record<string, unknown>;
    className?: string;
    showRequirements?: boolean;
    submitText?: string;
    children?: ReactNode;
};

const PasswordForm: React.FC<PasswordFormProps> = ({
    onSubmit,
    rules = {},
    className = '',
    showRequirements = true,
    submitText = 'Validate Password',
    children,
}) => {
    return (
        <PasswordProvider initialRules={rules} onValidSubmit={password => onSubmit(password)}>
            <form onSubmit={e => e.preventDefault()} className={className}>
                {children || (
                    <>
                        <PasswordInput />
                        <ConfirmPasswordInput />
                        {showRequirements && <PasswordRequirements />}
                        <SubmitButton text={submitText} />
                        <ValidationSummary />
                    </>
                )}
            </form>
        </PasswordProvider>
    );
};

export default PasswordForm;
