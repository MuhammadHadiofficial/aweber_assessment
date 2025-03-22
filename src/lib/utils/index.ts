import type { PasswordRules, ValidationResult } from '@/lib/types';

// Default password validation rules
export const defaultPasswordRules: PasswordRules = {
    minLength: 6,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    specialCharSet: '!@#$%^&*()_-+=[]{};:"\'<,>.',
};

// Validation utility function
export const validatePassword = (
    password: string,
    confirmPassword: string | null = null,
    rules: PasswordRules = defaultPasswordRules
): ValidationResult => {
    const validationResults: ValidationResult = {
        isValid: true,
        errors: {},
    };

    // Check minimum length
    if (rules.minLength && password.length < rules.minLength) {
        validationResults.isValid = false;
        validationResults.errors.minLength = `Password must be at least ${rules.minLength} characters long`;
    }

    // Check for uppercase letter
    if (rules.requireUppercase && !/[A-Z]/.test(password)) {
        validationResults.isValid = false;
        validationResults.errors.uppercase = 'Password must contain at least one uppercase letter';
    }

    // Check for lowercase letter
    if (rules.requireLowercase && !/[a-z]/.test(password)) {
        validationResults.isValid = false;
        validationResults.errors.lowercase = 'Password must contain at least one lowercase letter';
    }

    // Check for number
    if (rules.requireNumber && !/[0-9]/.test(password)) {
        validationResults.isValid = false;
        validationResults.errors.number = 'Password must contain at least one number';
    }

    // Check for special character
    const escapedSet = rules.specialCharSet.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const specialCharRegex = new RegExp(`[${escapedSet}]`);
    if (rules.requireSpecialChar && !specialCharRegex.test(password)) {
        validationResults.isValid = false;
        validationResults.errors.specialChar = 'Password must contain at least one special character';
    }

    // Check if passwords match (if confirmPassword is provided)
    if (confirmPassword !== null && password !== confirmPassword) {
        validationResults.isValid = false;
        validationResults.errors.match = 'Passwords do not match';
    }

    return validationResults;
};
