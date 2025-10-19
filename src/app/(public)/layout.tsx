import Navbar from '@/components/shared/Navbar';
import ScrollableIcons from '@/components/shared/ScrollableIcons';
import React from 'react';

const commonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-w-[1920px] mx-auto'>
            <Navbar />
            <ScrollableIcons />
            {children}
        </div>
    );
};

export default commonLayout;