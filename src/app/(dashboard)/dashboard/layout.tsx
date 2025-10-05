import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import React from 'react';

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-w-[1920px] flex gap-10  mx-auto'>
            <Sidebar />
            {children}
        </div>
    );
};

export default dashboardLayout;