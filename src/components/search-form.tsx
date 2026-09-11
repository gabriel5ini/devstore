import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") ?? "";

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const searchQuery = data.q;

    if (!searchQuery) {
      return null;
    }

    router.push(`/search?q=${searchQuery}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3"
    >
      <SearchIcon className="h-5 w-5 text-zinc-500" />
      <input
        type="text"
        name="q"
        defaultValue={searchQuery}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none"
      />
    </form>
  );
}
