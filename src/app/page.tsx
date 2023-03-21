import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Similarity Api | Home',
  description: '',
};

export default function Home() {
  return (
    <main className='relative flex h-screen items-center justify-center overflow-x-hidden'>
      <div className='max-w-7x container mx-auto h-full w-full'>
        <div className='flex h-full flex-col items-center justify-center gap-6'>
          <Heading className=' text-black dark:text-gray-100'>
            Easily determine text similarity.
          </Heading>
          <Paragraph className='max-w-3xl lg:text-center'>
            With the text similarity API, you can easily determine the
            similarity between two pieces of text with a free{' '}
            <Link
              href='/login'
              className='text-black underline underline-offset-2 dark:text-blue-500'
            >
              API key
            </Link>
            .
          </Paragraph>
          <Link href='/documentation'>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
