import type { Meta, Story } from '@storybook/react';
import type React from 'react';
import { useEffect } from 'react';

import { PasswordInput } from '@/lib/components';
import type { PasswordInputProps } from '@/lib/components/PasswordInput';
import { PasswordProvider, usePasswordContext } from '@/lib/context/FormContext';

// A wrapper component that uses the actual PasswordProvider
const WithPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PasswordProvider>{children}</PasswordProvider>
);

// Story variant that uses the real provider in its default state.
const DefaultTemplate: Story<PasswordInputProps> = args => (
    <WithPasswordProvider>
        <PasswordInput {...args} />
    </WithPasswordProvider>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
    label: 'Password',
    placeholder: 'Enter password',
    showErrors: true,
};

// To simulate the error state, we create a component that sets an invalid password
const ErrorStateWrapper: React.FC = () => {
    // Access context actions
    const { setPassword, handleBlur } = usePasswordContext();

    useEffect(() => {
        // Set an invalid password (e.g., no special characters or numbers)
        setPassword('password'); // Invalid password
        // Mark password as touched so the error will display
        handleBlur('password');
    }, [setPassword, handleBlur]);

    return <PasswordInput />;
};

const ErrorTemplate: Story<PasswordInputProps> = args => (
    <WithPasswordProvider>
        <ErrorStateWrapper />
    </WithPasswordProvider>
);

export const WithError = ErrorTemplate.bind({});
WithError.args = {
    label: 'Password',
    placeholder: 'Enter password',
    showErrors: true,
};

export default {
    title: 'Components/PasswordInput',
    component: PasswordInput,
} as Meta;
