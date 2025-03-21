import type { Meta, Story } from '@storybook/react';
import type React from 'react';
import { useEffect } from 'react';

import type { ConfirmPasswordInputProps } from '@/lib/components/ConfirmPasswordInput';
import ConfirmPasswordInput from '@/lib/components/ConfirmPasswordInput';
import { PasswordProvider, usePasswordContext } from '@/lib/context/FormContext';

// A wrapper component that uses the actual PasswordProvider
const WithPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PasswordProvider>{children}</PasswordProvider>
);

// Story variant that uses the real provider in its default state.
const DefaultTemplate: Story<ConfirmPasswordInputProps> = args => (
    <WithPasswordProvider>
        <ConfirmPasswordInput {...args} />
    </WithPasswordProvider>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
    label: 'Confirm Password',
    placeholder: 'Confirm password',
    showErrors: true,
};

// To simulate the error state, we create a component that sets mismatched passwords
const ErrorStateWrapper: React.FC = () => {
    // Access context actions
    const { setPassword, setConfirmPassword, handleBlur } = usePasswordContext();

    useEffect(() => {
        // Set the password and a non-matching confirm password
        setPassword('password123');
        setConfirmPassword('differentPassword');
        // Mark confirmPassword as touched so the error will display
        handleBlur('confirmPassword');
    }, [setPassword, setConfirmPassword, handleBlur]);

    return <ConfirmPasswordInput />;
};

const ErrorTemplate: Story<ConfirmPasswordInputProps> = args => (
    <WithPasswordProvider>
        <ErrorStateWrapper />
    </WithPasswordProvider>
);

export const WithError = ErrorTemplate.bind({});
WithError.args = {
    label: 'Confirm Password',
    placeholder: 'Confirm password',
    showErrors: true,
};

export default {
    title: 'Components/ConfirmPasswordInput',
    component: ConfirmPasswordInput,
} as Meta;
