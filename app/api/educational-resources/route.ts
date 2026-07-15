import { NextRequest, NextResponse } from "next/server";
import { MemStorage } from "@lib/storage";

const storage = new MemStorage();

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type") || undefined;
    const resources = await storage.getEducationalResources(type);
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving educational resources" },
      { status: 500 }
    );
  }
}
