import { ConfirmPasswordInput, PasswordInput, SubmitButton } from '@/lib/components';
import { PasswordProvider } from '@/lib/context/FormContext';
import { usePasswordContext } from '@/lib/hooks';
const LiveValidationForm = () => {
    const handleSubmit = (password: string) => {
        console.log('Form submitted with password:', password);
    };

    // Custom validation messages component
    const LiveValidation = () => {
        const { password, validation } = usePasswordContext(); // Access context

        if (!password) return null;

        const criteria: { key: keyof typeof validation.errors; label: string }[] = [
            { key: 'minLength', label: 'At least 6 characters' },
            { key: 'uppercase', label: 'Contains uppercase letter' },
            { key: 'lowercase', label: 'Contains lowercase letter' },
            { key: 'number', label: 'Contains number' },
            { key: 'specialChar', label: 'Contains special character' },
        ];

        return (
            <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">Requirements:</h3>
                <ul className="space-y-1">
                    {criteria.map(({ key, label }) => (
                        <li
                            key={key}
                            className={`flex items-center text-sm ${
                                validation.errors[key] ? 'text-red-600' : 'text-green-600'
                            }`}
                        >
                            <span className="mr-2">{validation.errors[key] ? '✗' : '✓'}</span>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-md p-4">
            <h2 className="mb-4 text-xl font-semibold">Create Password</h2>

            <PasswordProvider onValidSubmit={handleSubmit}>
                <form>
                    <PasswordInput showErrors={false} />
                    <LiveValidation />
                    <ConfirmPasswordInput />
                    <SubmitButton text="Save Password" disableWhenInvalid={true} />
                </form>
            </PasswordProvider>
        </div>
    );
};

export default LiveValidationForm;
