import { useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = cat
          ? `http://localhost:4555/api/products?category=${cat}`
          : "http://localhost:4555/api/products";
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    filters
      ? setFilteredProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        )
      : setFilteredProducts(products);
  }, [products, cat, filters]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
