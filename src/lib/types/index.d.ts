// Interfaces and Types

export type PasswordRules = {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumber: boolean;
    requireSpecialChar: boolean;
    specialCharSet: string;
};

export type ValidationErrors = {
    minLength?: string;
    uppercase?: string;
    lowercase?: string;
    number?: string;
    specialChar?: string;
    match?: string;
};

export type ValidationResult = {
    isValid: boolean;
    errors: ValidationErrors;
};
