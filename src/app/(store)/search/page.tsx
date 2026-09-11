import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{
    q: string;
  }>;
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: { revalidate: 60 }, // 1 minute
  });

  const searchedProducts = await response.json();

  return searchedProducts;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;

  if (!query) {
    redirect("/");
  }

  const products = await searchProducts(query);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group col-span-1 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex items-baseline justify-center"
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
    </div>
  );
}
