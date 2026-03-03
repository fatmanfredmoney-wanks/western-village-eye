import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ articles: [] });
  }

  try {
    const results = await searchContent(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ articles: [] });
  }
}
