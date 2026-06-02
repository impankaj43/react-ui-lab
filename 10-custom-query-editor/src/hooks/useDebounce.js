import React, { useEffect, useState } from "react";

function useDebounce(searchString, delay = 500) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const keywords = [
    "India",
    "China",
    "USA",
    "Indonesia",
    "Pakistan",
    "Nigeria",
    "Brazil",
    "Bangladesh",
    "Russia",
    "Mexico",
    "Japan",
    "Germany",
    "UK",
    "France",
    "Italy",
    "Canada",
    "Australia",
    "Spain",
    "Egypt",
    "Turkey",
    "Vietnam",
    "Iran",
    "Poland",
    "Argentina",
    "Malaysia",
  ];

  useEffect(() => {
    setLoading(true);
    if (!searchString.trim()) {
      setData([]);
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      const filteredData = keywords.filter((keyword) =>
        keyword.toLowerCase().includes(searchString.toLowerCase()),
      );
      setData(filteredData);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchString, delay]);
  return { data, loading };
}

export default useDebounce;
