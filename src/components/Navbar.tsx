import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { SignInButton, SignOutButton } from '@/components/button';
import ThemeToggle from './ThemeToggle';
import { authOptions } from '@/lib/auth';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='back-drop-blur-sm fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-slate-300 bg-white/75 shadow-sm dark:border-gray-900/20 dark:bg-[#0d0d0d]'>
      <div className='container mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link
          href='/'
          className='md:text-md select-none text-base text-gray-900 dark:text-gray-100 lg:text-lg'
        >
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
