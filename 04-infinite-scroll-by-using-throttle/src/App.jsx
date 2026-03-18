import React, { useEffect, useRef, useState } from "react";
import Card from "./componets/Card";
import "./App.css";
import useThrottle from "./hooks/useThrottle";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const controllerRef = useRef(null);
  const limit = 10;

  const loadingRef = useRef(loading);
  const skipRef = useRef(skip);

  useEffect(() => {
    loadingRef.current = loading;
    skipRef.current = skip;
  }, [loading, skip]);

  const fetchProducts = async () => {
    if (loadingRef.current) return;
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skipRef.current}`,
        { signal: controller.signal },
      );
      const data = await response.json();
      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + limit);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request Aborted");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      fetchProducts();
    }
  };

  const throttledHandleScroll = useThrottle(handleScroll, 150);

  useEffect(() => {
    fetchProducts();
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [throttledHandleScroll]);

  return (
    <div className="main">
      <h2>Infinite Scroll (Fixed)</h2>

      {products.map((product, index) => (
        <Card key={`${product.id}-${index}`} product={product} />
      ))}

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading more items...
        </p>
      )}
    </div>
  );
}

export default App;
