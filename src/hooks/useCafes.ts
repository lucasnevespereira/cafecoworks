import { useEffect, useState } from "react";
import type { Cafe } from "@/src/types/cafe";

export function useCafes() {
  const [cafes, setCafes] = useState<Cafe[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch("/cafes.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cafes data");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setCafes(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Unknown error");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { cafes, loading, error };
}