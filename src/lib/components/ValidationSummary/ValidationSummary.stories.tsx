import type { Meta, Story } from '@storybook/react';
import type React from 'react';
import { useEffect } from 'react';

import { ValidationSummary } from '@/lib/components';
import { PasswordProvider } from '@/lib/context/FormContext';
import { usePasswordContext } from '@/lib/hooks';

type ValidationSummaryProps = {
    className?: string;
    successClassName?: string;
    errorClassName?: string;
    successMessage?: string;
};

// A wrapper component that uses the actual PasswordProvider
const WithPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PasswordProvider>{children}</PasswordProvider>
);

// Story variant that uses the real provider in its default state.
const DefaultTemplate: Story<ValidationSummaryProps> = args => (
    <WithPasswordProvider>
        <ValidationSummary {...args} />
    </WithPasswordProvider>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
    className: '',
    successClassName: 'bg-green-100 text-green-800',
    errorClassName: 'bg-red-100 text-red-800',
    successMessage: 'Password is valid!',
};

// To simulate the error state, we create a component that sets mismatched passwords
const ErrorStateWrapper: React.FC = () => {
    const { setPassword, setConfirmPassword, handleBlur } = usePasswordContext();

    useEffect(() => {
        // Set an invalid password (e.g., no special characters or numbers)
        setPassword('password'); // Invalid password
        setConfirmPassword('differentPassword');
        handleBlur('confirmPassword'); // Mark confirm password as touched so the error will display
    }, [setPassword, setConfirmPassword, handleBlur]);

    return <ValidationSummary />;
};

const ErrorTemplate: Story<ValidationSummaryProps> = args => (
    <WithPasswordProvider>
        <ErrorStateWrapper />
    </WithPasswordProvider>
);

export const WithError = ErrorTemplate.bind({});
WithError.args = {
    className: '',
    successClassName: 'bg-green-100 text-green-800',
    errorClassName: 'bg-red-100 text-red-800',
    successMessage: 'Password is valid!',
};

export default {
    title: 'Components/ValidationSummary',
    component: ValidationSummary,
} as Meta;
