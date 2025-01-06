import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const apiUrl = import.meta.env.VITE_API_URL;

const Rectangle2 = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/rectangles`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const openModal = () => {
    setVideo(images[currentIndex]?.video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideo("");
  };

  return (
    <div className="relative container max-w-[1440px] m-auto overflow-hidden">
      <div
        className="relative flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative group">
            <img
              src={image.image}
              alt={`SectionImage ${index + 1}`}
              className="w-full h-[503px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center text-white px-[52px] mt-[32px] rounded-lg">
        <h2 className="text-4xl font-thin leading-[34.5px] mb-4 font-judson drop-shadow-lg">
          What's on
        </h2>
        <h2 className="text-[48px] leading-[38.28px] font-thin mb-2 font-gotham drop-shadow-lg">
          {images[currentIndex]?.name}
        </h2>
        <p className="font-thin text-md leading-[21px] w-[578px] font-gotham uppercase mt-[15px] mb-[26px]">
          {images[currentIndex]?.title}
        </p>

        <div>
          <button className="mt-4 w-[203.4px] h-[47.54px] bg-[#C8102E] text-white font-bold text-lg leading-[17.14px] transition-transform transform hover:scale-105 shadow-lg">
            More info
          </button>
          <button
            className="w-[196px] border ml-[26px] border-white h-[47.54px]"
            onClick={openModal}>
            Watch trailer
          </button>
        </div>
      </div>

      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-1/2 text-white rounded-full bg-black cursor-pointer p-3 hover:bg-opacity-70 transition duration-300"
        onClick={prevSlide}>
        <MdChevronLeft className="w-[36px] h-[36px]" />
      </div>
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-1/2 text-white rounded-full bg-black cursor-pointer p-3 hover:bg-opacity-70 transition duration-300"
        onClick={nextSlide}>
        <MdChevronRight size={36} />
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}>
          <div
            className="bg-black p-4 rounded-lg relative w-[80%] max-w-[800px]"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-lg font-bold"
              onClick={closeModal}>
              X
            </button>
            <iframe
              width="100%"
              height="450"
              src={video}
              title="Video Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rectangle2;
