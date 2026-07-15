import { NextRequest, NextResponse } from "next/server";
import { MemStorage } from "@lib/storage";

const storage = new MemStorage();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const careerPaths = await storage.getCareerPaths();
    return NextResponse.json(careerPaths);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving career paths" },
      { status: 500 }
    );
  }
}
