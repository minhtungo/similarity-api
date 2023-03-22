import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { formatDistance } from 'date-fns';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import { Input } from '@/ui/Input';

const ApiDashBoard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) return notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializedRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className='container flex flex-col gap-6'>
      <Heading size='sm'>Welcome back, {user.user.name}</Heading>
      <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start'>
        <Paragraph>Your API key:</Paragraph>
        <Input className='w-fit truncate' readOnly value={activeApiKey.key} />
      </div>
    </div>
  );
};
export default ApiDashBoard;
