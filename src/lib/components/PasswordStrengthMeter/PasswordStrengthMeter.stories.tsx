import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { PasswordStrengthMeter } from '@/lib/components';
import { PasswordProvider } from '@/lib/context/FormContext';

export default {
    title: 'Components/PasswordStrengthMeter',
    component: PasswordStrengthMeter,
} as Meta;

// Template for PasswordStrengthMeter component
const Template: Story = args => (
    <PasswordProvider initialValues={{ initialPassword: 'TestPassword123', initialConfirmPassword: 'TestPassword123' }}>
        <PasswordStrengthMeter {...args} />
    </PasswordProvider>
);

// Default story with no custom props
export const Default = Template.bind({});
Default.args = {
    className: '',
    labelClassName: '',
};

// Story with custom password strength (weak password example)
export const WeakPassword = Template.bind({});
WeakPassword.args = {
    className: '',
    labelClassName: '',
};
WeakPassword.decorators = [
    Story => (
        <PasswordProvider initialValues={{ initialPassword: 'password', initialConfirmPassword: 'password' }}>
            <Story />
        </PasswordProvider>
    ),
];

// Story with medium strength password
export const MediumPassword = Template.bind({});
MediumPassword.args = {
    className: '',
    labelClassName: '',
};
MediumPassword.decorators = [
    Story => (
        <PasswordProvider initialValues={{ initialPassword: 'Password123', initialConfirmPassword: 'Password123' }}>
            <Story />
        </PasswordProvider>
    ),
];

// Story with strong password
export const StrongPassword = Template.bind({});
StrongPassword.args = {
    className: '',
    labelClassName: '',
};
StrongPassword.decorators = [
    Story => (
        <PasswordProvider
            initialValues={{ initialPassword: 'TestPassword123!', initialConfirmPassword: 'TestPassword123!' }}
        >
            <Story />
        </PasswordProvider>
    ),
];

// Story with very strong password
export const VeryStrongPassword = Template.bind({});
VeryStrongPassword.args = {
    className: '',
    labelClassName: '',
};
VeryStrongPassword.decorators = [
    Story => (
        <PasswordProvider
            initialValues={{
                initialPassword: 'Test@123StrongPassword!',
                initialConfirmPassword: 'Test@123StrongPassword!',
            }}
        >
            <Story />
        </PasswordProvider>
    ),
];
