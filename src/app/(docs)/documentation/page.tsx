import { FC } from 'react';

import type { Metadata } from 'next';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';

export const medata: Metadata = {
    title: 'Similarity API | Documentation',
    description: 'Free text similarity API',
}

const page: FC= ({}) => {
  return <div className='container max-w-7xl mx-auto mt-12'>
    <div className="flex flex-col items-center gap-6">
        <Heading>Making a request</Heading>
        <Paragraph>api/v1/similarity</Paragraph>

        
    </div>
  </div>
}

export default page