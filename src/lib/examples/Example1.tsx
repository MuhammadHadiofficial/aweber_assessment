import { PasswordForm } from '@/lib/components';

export const Example1 = () => {
    const handlePasswordSubmit = (validPassword: string) => {
        console.log('Valid password:', validPassword);
        // Proceed with registration
    };

    return (
        <div className="mx-auto max-w-md p-4">
            <h1 className="mb-6 text-2xl font-bold">Create Account</h1>
            <PasswordForm onSubmit={handlePasswordSubmit} />
        </div>
    );
};

export default Example1;
