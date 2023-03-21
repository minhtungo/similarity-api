import { ApiDashBoard, RequestApiKey } from '@/components/dashboard';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Similarity API Dashboard',
};

const DashboardPage = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });

  return (
    <div className='mx-auto max-w-7xl pt-16'>
      {apiKey ? <ApiDashBoard /> : <RequestApiKey />}
    </div>
  );
};

export default DashboardPage;
