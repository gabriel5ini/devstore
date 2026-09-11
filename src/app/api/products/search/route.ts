import { type NextRequest, NextResponse } from "next/server";
import data from "../data.json";
import z from "zod";

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("q");

  const products = data.products.filter((product) =>
    product.title.toLowerCase().includes(query?.toLowerCase() ?? ""),
  );

  return NextResponse.json(products);
}
