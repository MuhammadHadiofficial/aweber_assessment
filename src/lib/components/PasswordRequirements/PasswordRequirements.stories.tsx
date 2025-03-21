import type { Meta, Story } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import type { PasswordRequirementsProps } from '@/lib/components';
import { PasswordRequirements } from '@/lib/components';
import { PasswordProvider } from '@/lib/context/FormContext'; // Import the original PasswordProvider

export default {
    title: 'Components/PasswordRequirements',
    component: PasswordRequirements,
} as Meta;

// Template for PasswordRequirements component
const Template: Story<PasswordRequirementsProps> = args => (
    <PasswordProvider initialValues={{ initialPassword: 'TestPassword123', initialConfirmPassword: 'TestPassword123' }}>
        <PasswordRequirements {...args} />
    </PasswordProvider>
);

// Default story with no custom props
export const Default = Template.bind({});
Default.args = {
    className: '',
    title: 'Password must contain:',
    titleClassName: '',
    listClassName: '',
    itemClassName: '',
};

// Story with all rules enabled (assuming the context has rules set)
export const WithAllRules = Template.bind({});
WithAllRules.args = {
    className: '',
    title: 'Password must contain:',
    titleClassName: '',
    listClassName: 'text-xs text-gray-600',
    itemClassName: 'list-inside',
};

// Story with only minimum length requirement enabled
export const WithMinLengthOnly = Template.bind({});
WithMinLengthOnly.args = {
    className: '',
    title: 'Password must contain:',
    titleClassName: '',
    listClassName: 'text-xs text-gray-600',
    itemClassName: 'list-inside',
};
WithMinLengthOnly.decorators = [
    Story => (
        <PasswordProvider
            initialValues={{ initialPassword: 'TestPassword123', initialConfirmPassword: 'TestPassword123' }}
        >
            {/* Override the rules to show only minLength */}
            <Story />
        </PasswordProvider>
    ),
];

// Story with only special character requirement enabled
export const WithSpecialCharOnly = Template.bind({});
WithSpecialCharOnly.args = {
    className: '',
    title: 'Password must contain:',
    titleClassName: '',
    listClassName: 'text-xs text-gray-600',
    itemClassName: 'list-inside',
};
WithSpecialCharOnly.decorators = [
    Story => (
        <PasswordProvider
            initialValues={{ initialPassword: 'TestPassword123', initialConfirmPassword: 'TestPassword123' }}
        >
            {/* Override the rules to show only specialChar */}
            <Story />
        </PasswordProvider>
    ),
];
