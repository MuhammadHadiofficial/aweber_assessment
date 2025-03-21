import { useContext } from 'react';

import type { PasswordContextType } from '../components';
import PasswordContext from '../context/FormContext';

// Custom hook to use the password context
const usePasswordContext = (): PasswordContextType => {
    const context = useContext(PasswordContext);
    if (!context) {
        throw new Error('usePasswordContext must be used within a PasswordProvider');
    }
    return context;
};

export default usePasswordContext;
