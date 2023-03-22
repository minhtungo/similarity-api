import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { formatDistance } from 'date-fns';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

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



  return <div>ApiDashBoard</div>;
};
export default ApiDashBoard;
