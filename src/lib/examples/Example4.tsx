import React, { useState } from 'react';

import { ConfirmPasswordInput, PasswordInput, PasswordStrengthMeter } from '@/lib/components';
import { PasswordProvider, usePasswordContext } from '@/lib/context/FormContext';

export const Example4 = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    //TODO: Hadi Add other fields and customize form in future extend this libary to support complete form state and inputs support
  });
  // Get password context reference
  const passwordRef = React.useRef();
  const handleFormSubmit = e => {
    e.preventDefault();

    // Validate password first
    const isPasswordValid = passwordRef.current.handleSubmit();

    if (isPasswordValid) {
      // Submit the entire form with all data
      const completeData = {
        ...formData,
        password: passwordRef.current.password,
      };

      console.log('Submitting complete form:', completeData);
    }
  };

  // Create a wrapper component to expose the context
  const PasswordSection = () => {
    const passwordContext = usePasswordContext();

    // Expose context through ref
    React.useEffect(() => {
      passwordRef.current = passwordContext;
    }, [passwordContext]);

    return (
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-medium">Security</h3>
        <PasswordInput />
        <PasswordStrengthMeter />
        <ConfirmPasswordInput />
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <PasswordProvider>
          <PasswordSection />
        </PasswordProvider>

        <button
          type="submit"
          disabled={passwordRef.current?.validation?.isValid === false}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};
