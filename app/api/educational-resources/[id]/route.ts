import { NextRequest, NextResponse } from "next/server";
import { MemStorage } from "@lib/storage";

const storage = new MemStorage();

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resourceId = parseInt(id);
    if (isNaN(resourceId)) {
      return NextResponse.json({ message: "Invalid resource ID" }, { status: 400 });
    }
    const resource = await storage.getEducationalResourceById(resourceId);
    if (!resource) {
      return NextResponse.json({ message: "Educational resource not found" }, { status: 404 });
    }
    return NextResponse.json(resource);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving educational resource" },
      { status: 500 }
    );
  }
}
