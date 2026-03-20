import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "./componets/Card";
import "./App.css";
import Pagination from "./componets/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const limit = 10;
  const controllerRef = useRef(null);
  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    let skip = (page - 1) * limit;
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        { signal: controller.signal },
      );
      const data = await response.json();
      setTotalProducts(data.total);
      setProducts(data.products);
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
    fetchProducts();
  }, [page]);

  const handlePageChange = useCallback((pageNumer) => {
    setPage(pageNumer);
  }, []);

  return (
    <div className="main">
      <h2>Offset Based Pagination</h2>

      {products.map((product, index) => (
        <Card key={`${product.id}-${index}`} product={product} />
      ))}

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading more items...
        </p>
      )}
      <Pagination
        totalProducts={totalProducts}
        currentPage={page}
        limit={limit}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
