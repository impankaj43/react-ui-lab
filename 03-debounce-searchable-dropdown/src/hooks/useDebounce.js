import { useEffect, useRef, useState } from "react";

function useDebounce(query, delay = 500) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/users/search?q=${query}`,
          { signal: controller.signal },
        );

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [query, delay]);

  return { users, loading };
}

export default useDebounce;
