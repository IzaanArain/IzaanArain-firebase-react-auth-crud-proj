import React from 'react';
import { Navigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = UserAuth();

    if (loading) return <h1>...Loading</h1>;

    console.log(user)

    if (!user) {
        return <Navigate to='/' />;
    }
    return children;
};

export default ProtectedRoute;