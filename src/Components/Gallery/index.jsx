import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const apiUrl = import.meta.env.VITE_API_URL;

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });

    const fetchGalleryImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/gallery?page=${currentPage}&limit=7`
        );
        if (!response.ok) {
          throw new Error("Gallery images not found");
        }
        const data = await response.json();
        setGalleryImages(data.galleries);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container max-w-[1440px] m-auto">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : galleryImages.length > 0 ? (
        galleryImages.map((galleryImage, index) => {
          let imgClass = "object-contain";
          let aosDuration = 3000 + index * 500;

          if (index === 0) {
            imgClass += " w-full";
          } else if (index === 1 || index === 2) {
            imgClass += "w-[604px]";
          } else if (index === 3) {
            imgClass += " w-[1228px]";
          } else if (index === 4) {
            imgClass += " w-[812px]";
          } else if (index === 5 || index === 6) {
            imgClass += " w-[604px]";
          }

          const isSideBySide =
            index === 1 || index === 2 || index === 5 || index === 6;

          return (
            <div
              key={index}
              className={`flex ${
                isSideBySide ? "space-x-4" : ""
              } items-center justify-center mt-[58px]`}
              data-aos="fade-up"
              data-aos-duration={aosDuration}>
              <img
                src={galleryImage.Image}
                alt={`galleryImage${index + 1}`}
                className={imgClass}
              />
            </div>
          );
        })
      ) : (
        <p className="text-center">No gallery images available</p>
      )}

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md transition duration-300 hover:bg-blue-700 disabled:opacity-50">
          Previous
        </button>
        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md transition duration-300 hover:bg-blue-700 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
