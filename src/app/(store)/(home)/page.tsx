import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Used because we dont have the api separated from the web app
export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api("/products/featured", {
    next: { revalidate: 60 }, // 1 minute
  });

  const featuredProducts = await response.json();

  return featuredProducts;
}

export const metadata: Metadata = {
  title: "home",
};

export default async function StorePage() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="relative group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex items-baseline justify-center"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-300"
          width={920}
          height={920}
          quality={100}
          alt={highlightedProduct.title}
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate" title={highlightedProduct.title}>
            {highlightedProduct.title}
          </span>
          <span className="flex h-full items-center justify-center font-semibold bg-violet-500 px-5 rounded-full">
            {highlightedProduct.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex items-baseline justify-center"
        >
          <Image
            src={product.image}
            className="group-hover:scale-105 transition-transform duration-300"
            width={920}
            height={920}
            quality={100}
            alt={product.title}
          />

          <div className="absolute bottom-10 right-1/4 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate" title={product.title}>
              {product.title}
            </span>
            <span className="flex h-full items-center justify-center font-semibold bg-violet-500 px-5 rounded-full">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
