import { FC } from 'react';

import type { Metadata } from 'next';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import DocumentationTabs from '@/components/DocumentationTabs';

export const medata: Metadata = {
  title: 'Similarity API | Documentation',
  description: 'Free text similarity API',
};

const page: FC = ({}) => {
  return (
    <div className='container mx-auto mt-12 max-w-7xl'>
      <div className='flex flex-col items-center gap-6'>
        <Heading>Making a request</Heading>
        <Paragraph>api/v1/similarity</Paragraph>
        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
