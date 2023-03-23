import { buttonVariants } from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Icons from '@/components/ui/Icons';
import Paragraph from '@/components/ui/Paragraph';
import Link from 'next/link';
import { FC } from 'react';
import UserAuthForm from './UserAuthForm';

const page: FC = () => {
  return (
    <div className='container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full max-w-lg flex-col justify-center gap-6'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'w-fit',
            })}
            href='/'
          >
            <Icons.ChevronLeft className='mr-2 h-4 w-4' />
            Back to home
          </Link>

          <Heading>Welcome back!</Heading>
          <Paragraph>Please sign in using your Google account.</Paragraph>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;
