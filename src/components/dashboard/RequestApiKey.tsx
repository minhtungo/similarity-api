'use client';

import { FC, FormEvent, useState } from 'react';
import { toast } from '@/ui/Toast';
import { createApiKey } from '@/helpers/create-api-key';
import { Key } from 'lucide-react';
import Heading from '@/ui/Heading';
import CopyButton from '../CopyButton';
import { Input } from '@/ui/Input';
import Button from '@/ui/Button';

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          message: error.message,
          type: 'error',
        });
        return;
      }

      toast({
        title: 'Error',
        message: 'An unknown error occurred',
        type: 'error',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col items-center gap-6'>
        <Key className='mx-auto h-12 w-12 text-gray-400' />
        <Heading size='sm'>Create a new API Key</Heading>
      </div>
      <form onSubmit={createNewApiKey} className='mt-6 sm:flex sm:items-center'>
        <div className='relative rounded-md shadow-md sm:min-w-0 sm:flex-1'>
          {apiKey ? (
            <CopyButton
              className='animate-in fade-in absolute inset-y-0 right-0 duration-300'
              valueToCopy={apiKey}
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ''}
            placeholder='No API key generated yet.'
          />
        </div>
        <div className='mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
          <Button disabled={!!apiKey} isLoading={isCreating}>
            {isCreating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
