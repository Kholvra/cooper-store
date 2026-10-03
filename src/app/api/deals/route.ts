import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  try {
    const deals = await db.popularDeal.findMany({
      orderBy: { position: "asc" },
    });
    return NextResponse.json(deals);
  } catch (error) {
    console.error("Failed to load popular deals:", error);
    return NextResponse.json(
      { error: "Popular deals could not be loaded" },
      { status: 500 }
    );
  }
}
