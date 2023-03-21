import { FC } from 'react';

import type { Metadata } from 'next';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import DocumentationTabs from '@/components/DocumentationTabs';

import 'simplebar-react/dist/simplebar.min.css';

export const metadata: Metadata = {
  title: 'Similarity API | Documentation',
  description: 'Free text similarity API',
};

const page: FC = ({}) => {
  return (
    <div className='container mx-auto max-w-7xl py-8'>
      <div className='flex flex-col items-center gap-4'>
        <div>
          <Heading size='sm'>Making a request</Heading>
          <Paragraph className='mt-1'>api/v1/similarity</Paragraph>
        </div>
        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
