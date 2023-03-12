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
      <div className='container mx-auto h-full w-full max-w-7xl pt-32'>
        <div className='flex h-full flex-col items-center justify-start gap-6 lg:items-start lg:justify-center'>
          <Heading size='lg' className=' text-black dark:text-blue-500'>
            Easily determine <br /> text similarity.
          </Heading>
          <Paragraph className='max-w-xl lg:text-left'>
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
          <div className='relative aspect-square w-full max-w-lg lg:absolute lg:left-1/2 lg:max-w-3xl'>
            <Image
              priority
              quality={100}
              style={{
                objectFit: 'contain',
              }}
              fill
              src=''
              alt='type-writer'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
