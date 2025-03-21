import type React from 'react';

import { usePasswordContext } from '@/lib/context/FormContext';

type PasswordRequirementsProps = {
    className?: string;
    title?: string;
    titleClassName?: string;
    listClassName?: string;
    itemClassName?: string;
};

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
    className = '',
    title = 'Password must contain:',
    titleClassName = '',
    listClassName = '',
    itemClassName = '',
}) => {
    const { rules } = usePasswordContext();

    return (
        <div className={`mb-6 ${className}`}>
            <h3 className={`mb-2 text-sm font-medium text-gray-700 ${titleClassName}`}>{title}</h3>
            <ul className={`list-disc pl-5 text-xs text-gray-600 ${listClassName}`}>
                {rules.minLength > 0 && <li className={itemClassName}>At least {rules.minLength} characters</li>}
                {rules.requireUppercase && <li className={itemClassName}>At least 1 uppercase letter</li>}
                {rules.requireLowercase && <li className={itemClassName}>At least 1 lowercase letter</li>}
                {rules.requireNumber && <li className={itemClassName}>At least 1 number</li>}
                {rules.requireSpecialChar && (
                    <li className={itemClassName}>At least 1 special character ({rules.specialCharSet})</li>
                )}
            </ul>
        </div>
    );
};

export default PasswordRequirements;
