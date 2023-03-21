import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { CreateApiData } from '@/types/api';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) {
  if (req.method === 'GET') {
    try {
      const user = await getServerSession(req, res, authOptions).then(
        (res) => res?.user
      );

      if (!user) {
        return res
          .status(401)
          .json({ error: 'Not authorized', createdApiKey: null });
      }
      const existingApiKey = await db.apiKey.findFirst({
        where: { userId: user.id, enabled: true },
      });
      if (existingApiKey) {
        return res.status(401).json({
          error: 'You already have an API key.',
          createdApiKey: null,
        });
      }
      const createdApiKey = await db.apiKey.create({
        data: {
          userId: user.id,
          key: nanoid(),
        },
      });
      return res.status(201).json({ error: null, createdApiKey });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: error.issues, createdApiKey: null });
      }
      return res
        .status(400)
        .json({ error: 'Internal Server Error', createdApiKey: null });
    }
  }
  return res.status(405).end();
}
