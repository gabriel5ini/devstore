import { NextRequest, NextResponse } from "next/server";
import data from "./data.json";

export async function GET(_request: NextRequest) {
  return NextResponse.json(data.products);
}
