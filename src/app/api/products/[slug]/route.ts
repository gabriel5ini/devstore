import { NextRequest, NextResponse } from "next/server";
import data from "../data.json";
import z from "zod";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { slug } = await params;

  const parsedSlug = z.string().parse(slug);

  const product = data.products.find((product) => product.slug === parsedSlug);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 400 });
  }

  return NextResponse.json(product);
}
