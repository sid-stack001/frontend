import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProducts] = useState(6);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Best Discount Store $$$</h1>
      <div class="rbord">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="grid product-grid">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image-home"
                />
                <div class="product-details-home">
                  <p class="product-title-home">{product.title}</p>
                  <p class="product-price-home">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details: ", error)
      );
  }, [productId]);

  return (
    <div>
      <h1>Product Details</h1>
      <div class="rbord-pro">
        <div className="product-page">
          {product && (
            <>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-rating">
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
