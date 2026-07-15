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
    const careerPathId = parseInt(id);
    if (isNaN(careerPathId)) {
      return NextResponse.json({ message: "Invalid career path ID" }, { status: 400 });
    }
    const careerPath = await storage.getCareerPathById(careerPathId);
    if (!careerPath) {
      return NextResponse.json({ message: "Career path not found" }, { status: 404 });
    }
    return NextResponse.json(careerPath);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving career path" },
      { status: 500 }
    );
  }
}
