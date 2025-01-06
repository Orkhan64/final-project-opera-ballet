import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const apiUrl = import.meta.env.VITE_API_URL;

const NewsRectangle = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [buttonScale, setButtonScale] = useState(1);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${apiUrl}/newsSections`);
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching news sections:", error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleButtonClick = () => {
    setButtonScale(1.2);
    setTimeout(() => setButtonScale(1), 300);
  };

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}>
      <div className="relative container max-w-[1440px] bg-[#1A1A1A] m-auto overflow-hidden">
        <div
          className="relative flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative flex">
              <div className="flex-1 flex flex-col justify-center items-center p-4 text-white text-center">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="font-light mt-2">{slide.subtitle}</p>
              </div>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-1/2 h-[503px] object-cover transition-transform duration-700 ease-in-out"
              />
            </div>
          ))}
        </div>

        <div
          className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-white rounded-full bg-black cursor-pointer p-3 transition-all duration-300 ${
            showButtons ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          onClick={() => {
            handleButtonClick();
            prevSlide();
          }}>
          <MdChevronLeft
            className="w-[36px] h-[36px] transform transition-transform duration-300"
            style={{ transform: `scale(${buttonScale})` }}
          />
        </div>
        <div
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-white rounded-full bg-black cursor-pointer p-3 transition-all duration-300 ${
            showButtons ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          onClick={() => {
            handleButtonClick();
            nextSlide();
          }}>
          <MdChevronRight
            size={36}
            className="transform transition-transform duration-300"
            style={{ transform: `scale(${buttonScale})` }}
          />
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-gray-400 scale-100"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsRectangle;
