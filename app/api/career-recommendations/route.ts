import { NextRequest, NextResponse } from "next/server";
import { careerInputSchema } from "../../../shared/schema";
import { MemStorage } from "@lib/storage";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const storage = new MemStorage();

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = careerInputSchema.parse(body);
    const recommendations = await storage.getCareerRecommendations(validatedData);
    return NextResponse.json(recommendations);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return NextResponse.json(
        { message: "Validation error", errors: validationError.details },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Error generating career recommendations" },
      { status: 500 }
    );
  }
}
