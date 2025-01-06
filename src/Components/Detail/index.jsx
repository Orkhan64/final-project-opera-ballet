import React, { useEffect, useState } from "react";
import productsImage from "../../assets/school.png";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import "../../Components/Products/loading.css";
import ballerinaImages from "../../assets/school.png";
import { cartStore } from "../../Store/cartStore.js";

const apiUrl = import.meta.env.VITE_API_URL;

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = cartStore((state) => state.addToCart);
  const userId = localStorage.getItem("userId");

  const incrementHandler = () => {
    setQuantity(quantity + 1);
  };

  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("The product ID is invalid.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${apiUrl}/products/${id}`);
        if (!response.ok) {
          throw new Error("Product details could not be retrieved.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!userId) {
      console.error("User ID not available.");
      return;
    }

    if (product) {
      const newItem = {
        userId,
        productId: product._id,
        quantity,
      };

      console.log("Sent data:", newItem);
      addToCart(newItem);
    } else {
      console.error("Product information not available.");
    }
  };

  const nextSlide = () => {
    if (events.length > 3) {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 4 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (events.length > 3) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? events.length - 4 : prevIndex - 1
      );
    }
  };

  const handleEventClick = (index) => {
    if (events.length >= 4) {
      setCurrentIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="ballerina-figure">
          <img src={ballerinaImages} alt="Loading Ballerina" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="container max-w-[1224px] m-auto">
      <div className="flex items-center gap-[60px]">
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div>
          <div className="mb-[52px]">
            <h2 className="font-semibold text-[30.87px] leading-[37.26px] mb-2 w-[384px] font-gotham">
              {product.name}
            </h2>
            <p className="font-medium text-[26.33px] leading-[31.86px] italic">
              £{product.price}
            </p>
          </div>
          <div>
            <p className="font-medium text-xl leading-[22.9px] text-white mb-[16px]">
              Quantity
            </p>
            <div className="flex mb-[20px]">
              <div
                className="w-[40px] h-[40px] flex items-center text-center bg-black text-white border justify-center cursor-pointer"
                onClick={decrementHandler}>
                <FaMinus />
              </div>
              <div className="border w-[80px] h-[40px] bg-gray-400 flex items-center text-center justify-center ">
                <p className="font-medium text-[32.36px] leading-[39.16px] text-white font-gotham">
                  {quantity}
                </p>
              </div>
              <div
                className="w-[40px] h-[40px] flex items-center text-center bg-black text-white border justify-center cursor-pointer"
                onClick={incrementHandler}>
                <FaPlus />
              </div>
            </div>
          </div>
          <div>
            <button
              className="w-[277px] border-2 border-[#C8102E] text-[#C8102E] h-[59px] hover:bg-[#C8102E] hover:text-white"
              onClick={handleAddToCart}>
              Add to basket
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[160px]">
        <div className="container max-w-[1280px] m-auto">
          <div className="flex justify-between mb-[40px]">
            <h2 className="font-normal text-[32px] leading-[30.62px] font-gotham">
              RECENTLY VIEWED PRODUCTS
            </h2>
            <div className="flex">
              <div
                className="border bg-[#F0F0F0] text-black items-center flex text-center px-2.5 cursor-pointer"
                onClick={prevSlide}>
                <MdChevronLeft className="w-[24px] h-[24px]" />
              </div>
              <div
                className="border bg-[#F0F0F0] text-black items-center flex text-center px-2.5 cursor-pointer"
                onClick={nextSlide}>
                <MdChevronRight className="w-[24px] h-[24px]" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform  duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}>
              {events.map((event, index) => (
                <div
                  key={index}
                  className="w-[33.33%] flex-shrink-0 px-2"
                  onClick={() => handleEventClick(index)}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="mb-[19px]"
                  />
                  <div className="flex flex-col gap-2 mb-2 text-white">
                    <h2 className="font-normal text-lg  text-white leading-[20.57px]">
                      {event.title}
                    </h2>
                    <p className="font-semibold text-[22px] leading-[26.63px]">
                      {event.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
