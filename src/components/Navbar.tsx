import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from '@/components/ui/Button';
import { SignInButton, SignOutButton } from '@/components/button';
import ThemeToggle from './ThemeToggle';

const Navbar = async () => {
  const session = await getServerSession();
  return (
    <div className='back-drop-blur-sm dark:border-state-700 fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-slate-300 bg-white/75 shadow-sm dark:bg-slate-900'>
      <div className='container mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link href='/' className={buttonVariants({ variant: 'link' })}>
          Text Similarity
        </Link>
        <div className='md:hidden'>
          <ThemeToggle />
        </div>

        <div className='hidden gap-4 md:flex'>
          <ThemeToggle />
          <Link
            href='/documentation'
            className={buttonVariants({ variant: 'ghost' })}
          >
            Documentation
          </Link>
          {session ? (
            <>
              <Link
                href='/dashboard'
                className={buttonVariants({ variant: 'ghost' })}
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
