import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { CreateApiData } from '@/types/api';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(
  request: NextApiRequest,
  response: NextApiResponse<CreateApiData>
) {
  try {
    const user = await getServerSession(request, response, authOptions).then(
      (res) => res?.user
    );
    if (!user) {
      return NextResponse.json(
        { error: 'Not authorized', createdApiKey: null },
        { status: 401 }
      );
    }
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });
    if (existingApiKey) {
      return NextResponse.json(
        {
          error: 'You already have an API key.',
          createdApiKey: null,
        },
        { status: 409 }
      );
    }
    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });
    return NextResponse.json({ error: null, createdApiKey }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, createdApiKey: null },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error', createdApiKey: null },
      { status: 400 }
    );
  }
}
