import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
    const userRole = localStorage.getItem('role'); // O desde donde estés obteniendo el rol del usuario

    if (userRole !== role) {
        return <Navigate to="/" replace />;
    }

    return <Element {...rest} />;
};

export default ProtectedRoute;
