import React, { useEffect, useRef, useState } from "react";
import Card from "./componets/Card";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;
  const controllerRef = useRef(null);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        { signal: controller.signal },
      );
      const data = await response.json();
      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + limit);
      setHasMore(!(data.total < data.skip));
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

  useEffect(() => {
    if (!loaderRef.current && !hasMore) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntitry = entries[0];
        if (firstEntitry.isIntersecting) {
          fetchProducts();
        }
      },
      { root: null, threshold: 1 },
    );
    observerRef.current.observe(loaderRef.current);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [skip, hasMore]);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="main">
      <h2>Infinite Scroll (Using Observer)</h2>

      {products.map((product, index) => (
        <Card key={`${product.id}-${index}`} product={product} />
      ))}

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading more items...
        </p>
      )}
      <div ref={loaderRef} style={{ height: "50px" }} />
    </div>
  );
}

export default App;
