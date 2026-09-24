// apps/web/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));

    return NextResponse.json({
      success: true,
      data: allProjects,
    });
  } catch (error) {
    console.error('Failed to fetch projects from database:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Internal server error while fetching projects',
        },
      },
      { status: 500 }
    );
  }
}