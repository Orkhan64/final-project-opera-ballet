import React, { useEffect, useState } from "react";
import NewsImage from "../../assets/Rectangle 25.svg";

const apiUrl = import.meta.env.VITE_API_URL;

const NewsBackground = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${apiUrl}/news`);
      if (!response.ok) {
        throw new Error("No news received");
      }
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("An error occurred while retrieving news.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="container max-w-[1224px] m-auto">
      <h2 className="font-bold text-[36px] leading-[44px] font-gotham mt-[40px] mb-6">
        NEWS
      </h2>
      {newsData.map((news, index) => (
        <div
          key={news._id}
          className="flex justify-between gap-4 items-center mb-[96px] cursor-pointer">
          <div
            className="flex w-full p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleNewsClick(news)}>
            {index % 2 === 0 ? (
              <>
                <div className="w-1/2 pr-4">
                  <img
                    src={news.image || NewsImage}
                    alt={news.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="font-normal mb-[90px] text-xl ">
                    {news.title}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNewsClick(news);
                    }}
                    className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0" />
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Read News
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2">
                  <h3 className="font-normal text-xl mb-[90px]">
                    {news.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNewsClick(news);
                    }}
                    className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0" />
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      Read News
                    </span>
                  </button>
                </div>
                <div className="w-1/2 pl-4">
                  <img
                    src={news.image || NewsImage}
                    alt={news.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleOverlayClick}>
          <div className="bg-black text-white p-6 rounded-lg shadow-lg relative max-w-3xl w-full mx-4 max-h-[90%] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl hover:text-red-600">
              X
            </button>
            {selectedNews && (
              <>
                <img
                  src={selectedNews.image || NewsImage}
                  alt={selectedNews.title}
                  className="w-full h-auto mb-4"
                />
                <h3 className="font-normal text-lg">{selectedNews.title}</h3>
                <p className="font-normal text-base leading-[21px] mt-2">
                  {selectedNews.text}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsBackground;
