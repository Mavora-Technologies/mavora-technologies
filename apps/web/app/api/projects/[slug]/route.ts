// apps/web/app/api/projects/[slug]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug));

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Project not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Failed to fetch project by slug:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Internal server error while fetching project details',
        },
      },
      { status: 500 }
    );
  }
}