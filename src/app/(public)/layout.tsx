import React from 'react';

const commonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default commonLayout;