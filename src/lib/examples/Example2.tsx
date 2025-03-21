import {
    ConfirmPasswordInput,
    PasswordInput,
    PasswordRequirements,
    PasswordStrengthMeter,
    SubmitButton,
    ValidationSummary,
} from '@/lib/components';
import { PasswordProvider } from '@/lib/context/FormContext';

const CustomRegistrationForm = () => {
    const handlePasswordSubmit = (validPassword: string) => {
        console.log('Valid password:', validPassword);
        // Handle registration
    };

    return (
        <div className="mx-auto max-w-md p-4">
            <h1 className="mb-6 text-2xl font-bold">Custom Registration</h1>

            <PasswordProvider onValidSubmit={handlePasswordSubmit} initialRules={{ minLength: 8 }}>
                <form>
                    <PasswordInput label="Choose a Password" placeholder="Enter a strong password" />

                    <PasswordStrengthMeter />

                    <ConfirmPasswordInput label="Verify Password" placeholder="Re-enter your password" />

                    <PasswordRequirements title="Your password should have:" />

                    <SubmitButton text="Create Account" disableWhenInvalid={true} />

                    <ValidationSummary successMessage="Your password looks great!" />
                </form>
            </PasswordProvider>
        </div>
    );
};

export default CustomRegistrationForm;
