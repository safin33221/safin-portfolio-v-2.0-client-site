import Sidebar from '@/components/shared/Sidebar';
import React from 'react';

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-w-[1920px] flex   mx-auto'>
            <Sidebar />
            <main className=' w-full min-md:ml-40'>

            {children}
            </main>
        </div>
    );
};

export default dashboardLayout;