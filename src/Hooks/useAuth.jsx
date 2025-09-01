import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import React, { use } from 'react';

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo
};

export default useAuth;