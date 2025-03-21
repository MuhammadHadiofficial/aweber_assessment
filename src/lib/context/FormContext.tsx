import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import type { PasswordRules, ValidationResult } from '../utils';
import { defaultPasswordRules, validatePassword } from '../utils';

export type PasswordContextType = {
    // State
    password: string;
    confirmPassword: string;
    validation: ValidationResult;
    touched: { password: boolean; confirmPassword: boolean };
    dirty: { password: boolean; confirmPassword: boolean };
    submitted: boolean;
    rules: PasswordRules;

    // Actions
    setPassword: (newPassword: string) => void; // Sets the password state
    setConfirmPassword: (newConfirmPassword: string) => void; // Sets the confirm password state
    handleBlur: (field: 'password' | 'confirmPassword') => void; // Handles blur events for fields
    validatePassword: (newPassword?: string, newConfirmPassword?: string) => boolean; // Validates the password and confirm password
    handleSubmit: (e?: React.MouseEventHandler<HTMLButtonElement> | undefined) => boolean; // Handles form submission
    resetForm: () => void; // Resets the form state
};

// Create the context
const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

// Custom hook to use the password context
export const usePasswordContext = (): PasswordContextType => {
    const context = useContext(PasswordContext);
    if (!context) {
        throw new Error('usePasswordContext must be used within a PasswordProvider');
    }
    return context;
};

type PasswordProviderProps = {
    children: ReactNode;
    initialRules?: Partial<PasswordRules>;
    onValidSubmit?: (password: string) => void;
    initialValues?: {
        initialPassword?: string;
        initialConfirmPassword?: string;
    };
};

export const PasswordProvider = ({
    children,
    initialRules = {},
    onValidSubmit = () => {},
    initialValues = {},
}: PasswordProviderProps) => {
    const { initialPassword = '', initialConfirmPassword = '' } = initialValues;

    const [password, setPasswordState] = useState<string>(initialPassword);
    const [confirmPassword, setConfirmPasswordState] = useState<string>(initialConfirmPassword);
    const [touched, setTouched] = useState<{ password: boolean; confirmPassword: boolean }>({
        password: false,
        confirmPassword: false,
    });
    const [dirty, setDirty] = useState<{ password: boolean; confirmPassword: boolean }>({
        password: false,
        confirmPassword: false,
    });
    const [validation, setValidation] = useState<ValidationResult>({
        isValid: false,
        errors: {},
    });
    const [submitted, setSubmitted] = useState<boolean>(false);

    // Merged rules
    const rules: PasswordRules = { ...defaultPasswordRules, ...initialRules };

    // Validate password
    const validateCurrentPassword = useCallback(
        (newPassword: string = password, newConfirmPassword: string = confirmPassword) => {
            const results = validatePassword(newPassword, newConfirmPassword, rules);
            setValidation(results);
            return results.isValid;
        },
        [password, confirmPassword, rules]
    );

    // Handle password change
    const handlePasswordChange = useCallback(
        (newPassword: string) => {
            setPasswordState(newPassword);
            setDirty(prev => ({ ...prev, password: true }));
            validateCurrentPassword(newPassword, confirmPassword);
        },
        [confirmPassword, validateCurrentPassword]
    );

    // Handle confirm password change
    const handleConfirmPasswordChange = useCallback(
        (newConfirmPassword: string) => {
            setConfirmPasswordState(newConfirmPassword);
            setDirty(prev => ({ ...prev, confirmPassword: true }));
            validateCurrentPassword(password, newConfirmPassword);
        },
        [password, validateCurrentPassword]
    );

    // Handle blur events
    const handleBlur = useCallback((field: 'password' | 'confirmPassword') => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    // Handle form submission
    const handleSubmit = useCallback(() => {
        // Mark all fields as touched
        setTouched({ password: true, confirmPassword: true });
        setSubmitted(true);

        const isValid = validateCurrentPassword();

        if (isValid && onValidSubmit) {
            onValidSubmit(password);
        }

        return isValid;
    }, [password, validateCurrentPassword, onValidSubmit]);

    // Context value
    const value: PasswordContextType = {
        // State
        password,
        confirmPassword,
        validation,
        touched,
        dirty,
        submitted,
        rules,

        setPassword: handlePasswordChange,
        setConfirmPassword: handleConfirmPasswordChange,
        handleBlur,
        validatePassword: validateCurrentPassword,
        handleSubmit,

        // Reset form
        resetForm: () => {
            setPasswordState('');
            setConfirmPasswordState('');
            setTouched({ password: false, confirmPassword: false });
            setDirty({ password: false, confirmPassword: false });
            setValidation({ isValid: false, errors: {} });
            setSubmitted(false);
        },
    };

    return <PasswordContext.Provider value={value}>{children}</PasswordContext.Provider>;
};

export default PasswordContext;
