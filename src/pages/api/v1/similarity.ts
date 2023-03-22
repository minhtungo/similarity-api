import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { RevokeApiData } from '@/types/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = req.body as unknown;
    const apiKey = req.headers.authorizations;

    if (!apiKey) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    try {
      const { text1, text2 } = reqSchema.parse(body);

      const validApiKey = await db.apiKey.findFirst({
        where: {
          key: apiKey as string,
          enabled: true,
        },
      });

      if (!validApiKey) {
        return res.status(401).json({ error: 'Unauthorized', success: false });
      }

      const start = new Date();


    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues, success: false });
      }

      return res
        .status(500)
        .json({ error: 'Internal server error', success: false });
    }
  }
  return res.status(405).end();
};

export default handler;
