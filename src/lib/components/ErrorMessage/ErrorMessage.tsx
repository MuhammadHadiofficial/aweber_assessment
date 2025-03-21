import type React from 'react';

type ErrorMessagesProps = {
  errors?: string[];
  className?: string;
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors = [], className = '' }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className={`mt-1 text-sm text-red-600 ${className}`}>
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  );
};

export default ErrorMessages;
