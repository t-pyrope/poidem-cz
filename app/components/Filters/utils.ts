import { useRouter, useSearchParams } from "next/navigation";

export const useUpdateParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParams = (changes: {
    category?: string;
    organization?: string;
    from?: string;
    to?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();

    router.push(query ? `/?${query}` : "/", {
      scroll: false,
    });
  };

  return {
    updateParams,
  };
};
