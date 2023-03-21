'use client';

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs';
import SimpleBar from 'simplebar-react';
import Code from '@/ui/Code';
import { nodejs, python } from '@/helpers/documentation-code';

const DocumentationTabs: FC = ({}) => {
  return (
    <Tabs defaultValue='nodejs' className='w-full max-w-2xl'>
      <TabsList>
        <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>
      <TabsContent value='nodejs'>
        <SimpleBar forceVisible='y'>
          <Code animated language='javascript' code={nodejs} show />
        </SimpleBar>
      </TabsContent>
      <TabsContent value='python'>
        <SimpleBar forceVisible='y'>
          <Code animated language='python' code={python} show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
