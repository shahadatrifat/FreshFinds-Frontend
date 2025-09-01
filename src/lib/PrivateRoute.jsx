import useAuth from '../Hooks/useAuth';
import CartLoader from '../pages/shared/loaders/CartLoader';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { state: { from: location } });
        }
    }, [user, loading, navigate, location]);

    if (loading) {
        return <CartLoader/>;
    }

    if (!user) {
        return null;
    }

    return children;
};

export default PrivateRoute;
