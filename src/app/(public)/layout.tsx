import Navbar from '@/components/shared/Navbar';
import React from 'react';

const commonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-w-[1920px] mx-auto'>
            <Navbar />
            {children}
        </div>
    );
};

export default commonLayout;