import type { Meta, Story } from '@storybook/react';

import type { ErrorMessagesProps } from '@/lib/components/ErrorMessage';
import ErrorMessages from '@/lib/components/ErrorMessage';

export default {
    title: 'Components/ErrorMessages',
    component: ErrorMessages,
} as Meta;

// Template for ErrorMessages
const Template: Story<ErrorMessagesProps> = args => <ErrorMessages {...args} />;

// Default story without any errors
export const Default = Template.bind({});
Default.args = {
    errors: [],
    className: '',
};

// Story with multiple error messages
export const WithErrors = Template.bind({});
WithErrors.args = {
    errors: ['Password is too short', 'Passwords do not match', 'Email is invalid'],
    className: '',
};

// Story with custom className
export const CustomClassName = Template.bind({});
CustomClassName.args = {
    errors: ['This is a custom error'],
    className: 'text-lg font-bold', // Example of custom styling
};
