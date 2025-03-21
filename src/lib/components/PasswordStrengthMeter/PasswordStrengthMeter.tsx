import type React from 'react';

import { usePasswordContext } from '@/lib/context/FormContext';

type PasswordStrengthMeterProps = {
    className?: string;
    labelClassName?: string;
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
    className = '',
    labelClassName = '',
}) => {
    const { password, rules } = usePasswordContext();

    // Calculate strength score (0-100)
    const calculateStrength = (): number => {
        if (!password) return 0;

        let score = 0;
        const maxScore = [
            rules.minLength > 0,
            rules.requireUppercase,
            rules.requireLowercase,
            rules.requireNumber,
            rules.requireSpecialChar,
        ].filter(Boolean).length;

        if (password.length >= rules.minLength) score++;
        if (rules.requireUppercase && /[A-Z]/.test(password)) score++;
        if (rules.requireLowercase && /[a-z]/.test(password)) score++;
        if (rules.requireNumber && /[0-9]/.test(password)) score++;
        if (
            rules.requireSpecialChar &&
            new RegExp(`[${rules.specialCharSet.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')}]`).test(password)
        ) {
            score++;
        }

        const extraLength = Math.max(0, password.length - rules.minLength);
        const lengthBonus = Math.min(20, extraLength) / 20;

        return Math.floor((score / maxScore) * 80 + lengthBonus * 20);
    };

    const strength = calculateStrength();

    const getStrengthInfo = (): { label: string; color: string } => {
        if (strength < 20) return { label: 'Very Weak', color: 'bg-red-500' };
        if (strength < 40) return { label: 'Weak', color: 'bg-orange-500' };
        if (strength < 60) return { label: 'Medium', color: 'bg-yellow-500' };
        if (strength < 80) return { label: 'Strong', color: 'bg-blue-500' };
        return { label: 'Very Strong', color: 'bg-green-500' };
    };

    const { label, color } = getStrengthInfo();

    return (
        <div className={`mb-4 ${className}`}>
            <div className="mb-1 flex justify-between">
                <span className={`text-xs font-medium text-gray-700 ${labelClassName}`}>Password Strength</span>
                <span className={`text-xs font-medium text-gray-700 ${labelClassName}`}>{label}</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200">
                <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${strength}%` }} />
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;
