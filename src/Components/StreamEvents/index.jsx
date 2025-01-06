import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import EventsImage from "../../assets/Events.svg";

const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl, "apiUrl")

const StreamEvents = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}/streams`);
        const data = await response.json();
        const mostWatched = data.filter((event) => event.mostWatched);
        setEvents(mostWatched);
      } catch (error) {
        console.error("Eventleri alırken hata oluştu:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleMoreInfoClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleBuyTicketClick = () => {
    alert("Bilet satın alma fonksiyonu buraya gelecek.");
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-[57.57px]">
      <div className="container max-w-[1280px] m-auto">
        <div className="flex justify-between mb-[40px]">
          <div className="font-thin text-[32px] leading-[30.62px] font-gotham">
            <h2>En Çok İzlenenler</h2>
          </div>
        </div>

        <Slider {...sliderSettings}>
          {events.map((event, index) => (
            <div key={index} className="px-2">
              <div className="mb-[19px]">
                <img src={event.image || EventsImage} alt={event.title} />
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <h2 className="font-normal text-lg leading-[20.57px]">
                  {event.name}
                </h2>
                <p className="font-semibold text-[22px] leading-[26.63px]">
                  {event.category}
                </p>
              </div>
              <div>
                <p className="font-medium text-lg leading-[20.57px]">
                  {event.date}
                </p>
                <h2 className="font-normal text-base leading-[19.36px] mb-[29px] mt-2">
                  {event.subtitle}
                </h2>
                <button
                  className="mt-4 w-[203.4px] h-[47.54px] bg-[#C8102E] text-white font-bold text-lg leading-[17.14px] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => handleMoreInfoClick(event)}>
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeModal}>
            <div
              className="bg-white p-4 rounded-lg w-[90%] max-w-[600px]"
              onClick={(e) => e.stopPropagation()}>
              <h2 className="font-semibold text-xl">{selectedEvent?.title}</h2>
              <img
                src={selectedEvent?.image || EventsImage}
                alt={selectedEvent?.title}
                className="mb-4 w-full rounded-lg"
              />
              <p className="font-medium text-lg">{selectedEvent?.date}</p>
              <p className="font-normal text-lg">
                {selectedEvent?.description}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  className="w-[48%] h-[47.54px] border text-black font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleBuyTicketClick}>
                  Bilet Al
                </button>
                <button
                  className="w-[48%] h-[47.54px] border text-black font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closeModal}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamEvents;
