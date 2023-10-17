import { MainNav } from '@/components/MainNav';
import { TopNav } from '@/components/TopNav';
import type { WithChildrenProps } from '@/config/types';
import { Toaster } from 'react-hot-toast';

export const Layout = ({ children }: WithChildrenProps) => {

  return (
    <div className="min-w-screen relative w-full min-w-fit">
      <TopNav />
      <MainNav />
      <main className="rounded-[20px] mx-[32px] mb-4 min-w-0 min-h-screen flex-1 bg-slate-100 px-4 md:px-[22px] max-w-full md:max-w-auto before:w-full before:h-px before:block">
        {children}
      </main>
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
    </div>
  );
};
