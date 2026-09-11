import { NextRequest, NextResponse } from "next/server";
import data from "../data.json";

export async function GET(_request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const featuredProducts = data.products.filter((product) => product.featured);

  return NextResponse.json(featuredProducts);
}
