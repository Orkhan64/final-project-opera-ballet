import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ballerinaImages from "../../assets/school.png";
import "./loading.css";

const apiUrl = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
          throw new Error("Products could not be received.");
        }
        const data = await response.json();

        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="ballerina-figure">
          <img src={ballerinaImages} alt="Ballerina" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container max-w-[1224px] m-auto mt-[170px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[68px] text-black">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-[277px] drop-shadow-2xl transition-transform transform hover:scale-105 rounded-lg"
            onClick={() => navigate(`/DetailPage/${product._id}`)}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-[#EEEEEE] py-[18px]">
              <h2 className="font-semibold text-lg leading-[21.46px] mb-2">
                {product.name}
              </h2>
              <p className="font-medium text-lg leading-[21.46px] italic">
                £{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
