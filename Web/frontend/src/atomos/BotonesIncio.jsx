import React from 'react';

function Button({ children, bgColor }) {
    return (
        <button className={`text-lg p-2 rounded-lg ${bgColor}`}>
            {children}
        </button>
    );
}

export default Button;
